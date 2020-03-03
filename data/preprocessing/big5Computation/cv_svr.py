import csv
import pandas as pd
import numpy as np

from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

from sklearn.metrics import make_scorer
from sklearn.svm import SVR
from sklearn.model_selection import GridSearchCV
from sklearn.externals import joblib


FOLDER = "data"
SVR_CACHE_SIZE = 2048
N_JOBS = 6
RAND_SEED = 419
TRAITS = set(['neu', 'ope', 'ext', 'con', 'agr'])



# RMSE metric
def rmse(y_actual, y_predicted):
    from sklearn.metrics import mean_squared_error
    from math import sqrt
    return sqrt(mean_squared_error(y_actual, y_predicted))



# r2 metric
def r2(y_actual, y_predicted):
    from sklearn.metrics import r2_score
    return r2_score(y_actual, y_predicted)



def prepare_data(training_data, relative_test_size):
    scores = training_data[[*TRAITS]]
    features = training_data.drop(['userid'] + list(TRAITS), axis=1)

    # split to train-validation and test sets
    features_train, features_test, scores_train, scores_test = train_test_split(features, scores, test_size=relative_test_size, random_state=RAND_SEED)

    # scale input
    scaler = StandardScaler()
    scaler.fit(features_train)
    features_train = scaler.transform(features_train)
    features_test = scaler.transform(features_test)
    features_train = pd.DataFrame(features_train, columns=features.columns)
    features_test = pd.DataFrame(features_test, columns=features.columns)
    return features_train, features_test, scores_train, scores_test



def perform_cv(features_train, features_test, scores_train, scores_test, feature_names, 
            parameters, cv, trait, name):

    # select features
    X_train = features_train[[*feature_names]]
    X_test = features_test[[*feature_names]]
    y_train = scores_train[trait].values.flatten()
    y_test = scores_test[trait].values.flatten()

    print("Number of features", len(feature_names))
    print("Number of training samples", len(features_train))
    print("Number of test samples", len(features_test))

    scoring = {
        'rmse': make_scorer(rmse, greater_is_better=False),
        'r2': 'r2' #make_scorer(r2)
    }

    # train
    # training and scoring
    clf = GridSearchCV(
        SVR(kernel='rbf', tol=1e-3, cache_size=SVR_CACHE_SIZE),
        parameters,
        scoring=scoring,
        cv=cv,
        refit='rmse', # refit best scoring model on whole training data with rmse metric
        return_train_score=False, # for better performance
        verbose=2, # print progress
        n_jobs=6 # how many processes?
    )
    clf.fit(X_train, y_train)

    print("\n*** FINISHED ***")
    model_name = FOLDER + "/cv/univariate_svr_rbf_" + name + ".model"
    joblib.dump(clf.best_estimator_, model_name)
    print("saved model to disk: " + model_name)

    print(clf.cv_results_)
    print("\n## Best score:", clf.best_score_)
    print("## Best parameters:", clf.best_params_)

    print("\n## Scoring on test set:")
    s = clf.best_estimator_.score(X_test, y_test)
    print("   score=", s)



if __name__ == "__main__":
    # load data
    training_data = pd.read_csv(FOLDER + "/training_data.csv", encoding="UTF-8", index_col=0)

    pearson_features = {}
    with open(FOLDER + "/selected_features_pearson.py", 'rt', encoding="UTF-8", newline="") as file:
        reader = csv.reader(file, delimiter=",")
        next(reader)
        for row in reader:
            pearson_features[row[0]] = row[1:]

    # prepare data
    relative_test_size = 0.2
    features_train, features_test, scores_train, scores_test = prepare_data(training_data, relative_test_size)

    # configuration
    for trait in TRAITS:
        for feature_set in [trait, 'common']:
            if trait == 'con' and feature_set == 'con':
                continue

    	    #trait = 'neu'
            feature_names = pearson_features[feature_set]
            name = trait + "_" + feature_set + "_" + str(RAND_SEED)
            cv = 3 # cross-validation splitting strategy

            parameters = {
                'C': [0.001, 0.01, 0.1, 1, 10, 100],
                'gamma': ['auto'],
                'epsilon': [0.1, 0.3, 0.5, 0.7, 1]
            }

            print("######################")
            print("starting next training:", trait, feature_set)
            print("######################")
            # actual training
            perform_cv(features_train, features_test, scores_train, scores_test, 
                feature_names, parameters, cv, trait, name)
