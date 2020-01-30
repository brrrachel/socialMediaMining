#!/usr/bin/python
# -*- coding: ascii -*-
import psycopg2
import datetime
import csv
import enchant
d = enchant.Dict("en_GB")
import re
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords

if __name__ == '__main__':
    years = range(2009, 2020)
    months = [(1,3), (4,6), (7,9), (10,12)]
    days = [(1,31), (1,30), (1,30), (1,31)]

    connection = psycopg2.connect(user="postgres",
                                  password="postgres",
                                  host="localhost",
                                  port="5432",
                                  database="postgres")
    cursor = connection.cursor()

    index = 0
    for party in range(1, 32):
        for year in years:
            for i in range(len(months)):
                query_tweets = "select tweet from tweets where account_id = %s and (%s <= date) and (date <= %s)"
                from_date = datetime.date(year, months[i][0], days[i][0])
                to_date = datetime.date(year, months[i][1], days[i][1])
                print('Preprocess data for ' + str(party) + ' in ' + from_date.__str__() + ' until ' + to_date.__str__())

                cursor.execute(query_tweets, (party, from_date, to_date))
                result = str(cursor.fetchall()).lower()

                if result:
                    #preprocess string
                    result = re.sub(r'(\&[\n\S]+)|((?:http|https):\/\/[\n\S]+)|((pic\.twitter\.com)\/[\n\S]+)|\;\-\)|[0-9]+\s|\+|NaN|\"|\?|\'|\,|\.|\/\s|\?|\!|\(|\)|\#\s|\-\s|\:', '', result)
                    result = re.sub(r'/\@\s', '@', result)
                    result = re.sub(r'/\#\s', '#', result)
                    result = re.sub(r'/\s\#', ' #', result)

                    word_tokens = result.split(' ')
                    hashtag_and_reference = [w for w in word_tokens if (w.startswith('@') or w.startswith('#'))]

                    # remove stopwords
                    stop_words = set(stopwords.words('english'))
                    filtered_sentence = [w for w in word_tokens if not w in stop_words]

                    # remain meaningful words
                    filtered = list(filter(None, filtered_sentence))
                    meaningful = [w for w in filtered if ((d.check(w) == True) and (len(w) > 1) and (w.isdigit() != True))]

                    if meaningful:
                        with open('preprocessed_tweets.csv', 'a') as fp:
                            wr = csv.writer(fp, dialect='excel')
                            result = [index, party, year, months[i][0], months[i][1], ' '.join(meaningful + hashtag_and_reference)]
                            wr.writerow(result)
                        index += 1
                else:
                    print('No data for party with id ' + str(party) + ' in ' + from_date.__str__() + ' until ' + to_date.__str__())