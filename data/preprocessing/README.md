# Preprocessing of Tweet Data

In this folder you find all necessary script which with which we have preprocessed our tweet data.
After executing a preprocessing script you need to drop the whole database and setup it new.
Therefore move to ```../../setup/```.

## Duplicate Tweets
We noticed some duplicated tweets and therefore wrote ``getUniqueTweets.py``. It checks whether the tweet_id is already 
in the file and if so removes the duplicate tweet.

## Basic
```
python3 basics.py
```
Script for calculating the number of tweets per month. You find the results here: ```setup/querys/total_num_of_tweets.csv```.

## 5 Factor Model
At first it is necessary to create input files for the LIWC tool offered by Raad. This is done by executing
```
cd big5Computation && python get5FactorFiles.py
```
and then you find the files in the folder ``/big5Computation/fiveFactorFilesForLIWC``. Based on these files we got the file ```LIWC_results.csv``` from Raad back, which is the input for further steps.

To compute the five factors we are using a svr model. Open the ``Prediction.ipynb`` in a jupyter notebook and execute all 
cells to predict the five factors for each account and each quarter. The results are stored  in ``'../../../setup/querys/five-factor-values.csv'``
## Preprocess Tweets
```
python preprocessTweets.py
```
Here for each account per each month the tweets are preprocessed. As an output you get a csv file where you receive the preprocessed tweets in form of tokens. The outcomming file (csv) is moved to ```../../setup/querys/preprocessed_tweets.csv``` automatically.