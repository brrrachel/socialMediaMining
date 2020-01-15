import os
import csv
import json
import datetime
import datedelta

step = datedelta.datedelta(months=1)
json_file = []


def _calculate_occurrences_for_file(file, account_name, id):
    print('Evaluate ', account_name)
    dates = []
    for row in file:
        try:
            date = datetime.datetime.strptime(row[3], '%Y-%m-%d')
            dates.append(date)
        except ValueError:
            continue

    current = datetime.datetime(year=2008, month=1, day=1)
    end = datetime.datetime(year=2019, month=12, day=1)
    while current < end:
        next = current + step

        counter = 0
        for date in dates:
            if current <= date < next:
                counter+=1

        def save_as_csv(identifier):
            with open('experiments/total_num_of_tweets.csv', 'a') as fp:
                wr = csv.writer(fp, dialect='excel')
                result = [account_name, current.__str__(), counter, identifier]
                wr.writerow(result)

        save_as_csv(id)
        id += 1
        #json_file.append({'account_name': account_name, 'start': current.__str__(), 'end': next.__str__(), 'total': counter, 'id': i})
        current += step

    return id


def save_as_json(file):
    with open('experiments/total_num_of_tweets.json', 'a') as fp:
        json.dump(file, fp)


def total_num_of_tweets():
    id = 0
    os.chdir('..')
    for file in os.listdir('translations/tweepyTweets'):
        with open('translations/tweepyTweets/' + file, 'r') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            underscore_index = file.find('_')
            result_index = file.find('Result.csv')
            account = file[underscore_index+1:result_index]
            id = _calculate_occurrences_for_file(csv_reader, account, id)
    for file in os.listdir('translations/twintTweets'):
        with open('translations/twintTweets/' + file, 'r') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            underscore_index = file.find('_')
            result_index = file.find('_tweets.csv')
            if not underscore_index == result_index:
                account = file[underscore_index+1:result_index]
            else:
                account = file[:result_index]
            id = _calculate_occurrences_for_file(csv_reader, account, id)


if __name__ == '__main__':
    total_num_of_tweets()