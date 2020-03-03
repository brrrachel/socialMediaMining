#!/usr/bin/python
# -*- coding: ascii -*-
import os
import psycopg2
import datetime
import csv
import re
import nltk
from nltk.tokenize import TweetTokenizer
tweet_tokenizer = TweetTokenizer()
nltk.download('stopwords')
from nltk.corpus import stopwords
nltk.download('words')
from nltk.corpus import words
nltk.download('wordnet')
from nltk.corpus import wordnet

stop_words = set(stopwords.words('english'))
wordlist_lowercased = set([i.lower() for i in words.words()] + [i.lower() for i in wordnet.words()])

file_name = 'preprocessed_tweets.csv'


def check_for_unusual_word(word):
    if len(word) > 1:
        if (word.startswith('@') or word.startswith('#')) and ((word.count('@') == 1) or (word.count('#') == 1)):
            return True
        elif word.count('?') > 0 or word.count('?') > 0 or word.count('?') > 0:
            return True
        else:
            return False
    else:
        return False


if __name__ == '__main__':

    os.chdir('../../setup/querys/')
    if os.path.exists(file_name):
        os.remove(file_name)


    years = range(2009, 2020)
    months = range(1, 13)

    connection = psycopg2.connect(user="postgres",
                                  password="postgres",
                                  host="localhost",
                                  port="5432",
                                  database="postgres")
    cursor = connection.cursor()

    index = 0
    for party in range(1, 32):
        for year in range(2009, 2020):
            for month in months:

                query_tweets = "select tweet from tweets where account_id = %s and (%s <= date) and (date < %s)"
                from_date = datetime.date(year, month, 1)
                to_date = None
                if month == 12:
                    to_date = datetime.date(year+1, 1, 1)
                else:
                    to_date = datetime.date(year, month+1, 1)

                print('Preprocess data for ' + str(party) + ' in ' + from_date.__str__() + ' until ' + to_date.__str__())

                cursor.execute(query_tweets, (party, from_date, to_date))
                result = [w[0] for w in cursor.fetchall()]
                result = ' '.join(result)
                result = result.lower()

                if result:
                    # preprocess string
                    result = re.sub(r'(\&[\n\S]+)|((?:http|https):\/\/[\n\S]+)|((pic\.twitter\.com)\/[\n\S]+)|\;\-\)|[0-9]+\s|\+|NaN|\"|\?|\'|\,|\.|\/\s|\?|\!|\(|\)|\#\s|\-\s|\:', '', result)
                    result = re.sub(r'\@\s', '@', result)
                    result = re.sub(r'\#\s', '#', result)
                    result = re.sub(r'[1-9]', '', result)
                    result = re.sub(r'/\xc3/\xbc', '?', result)
                    result = re.sub(r'/\xc3/\xa4', '?', result)
                    result = re.sub(r'/\xc3/\xb6', '?', result)

                    # extract hashtags, references and words with umlauts
                    word_tokens = tweet_tokenizer.tokenize(result)
                    unusual_words = []
                    # unusual_words = [w for w in word_tokens if check_for_unusual_word(w)]

                    # remove stopwords
                    filtered_sentence = [w for w in word_tokens if not w in stop_words]

                    # remain meaningful words
                    filtered = list(filter(None, filtered_sentence))
                    meaningful = [w for w in filtered if (len(w) > 1) and (w.isdigit() != True) and not w.startswith('www') and not w.endswith('html')]
                    # (w in wordlist_lowercased) and

                    if meaningful:
                        with open(file_name, 'a') as fp:
                            wr = csv.writer(fp, dialect='excel')
                            result = [index, party, year, month, ' '.join(meaningful + unusual_words).encode('utf-8')]
                            wr.writerow(result)
                        index += 1
                else:
                    print('No data for party with id ' + str(party) + ' in ' + from_date.__str__() + ' until ' + to_date.__str__())