# coding=utf8
import csv
import psycopg2
import re


table_header = ["Index", "AccountID", "PartyID", "year", "quarter",	"Segment",	"WC",	"Analytic",	"Clout",	"Authentic",	"Tone",	"WPS",	'Sixltr',	'Dic',	'function.',	'pronoun',	'ppron',	'i',	'we',	'you',	'shehe',	'they',	'ipron',	'article',	'prep',	'auxverb',	'adverb',	'conj',	'negate',	'verb',	'adj',	'compare',	'interrog',	'number',	'quant',	'affect',	'posemo',	'negemo',	'anx',	'anger',	'sad',	'social',	'family',	'friend',	'female',	'male',	'cogproc',	'insight',	'cause',	'discrep',	'tentat',	'certain',	'differ',	'percept',	'see',	'hear',	'feel',	'bio',	'body',	'health',	'sexual',	'ingest',	'drives',	'affiliation',	'achieve',	'power',	'reward',	'risk',	'focuspast',	'focuspresent',	'focusfuture',	'relativ',	'motion',	'space',	'time',	'work',	'leisure',	'home',	'money',	'relig',	'death',	'informal',	'swear',	'netspeak',	'assent',	'nonflu',	'filler',	'AllPunc',	'Period',	'Comma',	'Colon',	'SemiC',	'QMark',	'Exclam',	'Dash',	'Quote',	'Apostro',	'Parenth', "OtherP"]

data = []
with open('LIWC_results.csv') as csvFile:
    data = list(csv.reader(csvFile))

connection = psycopg2.connect(user="postgres",
                              password="postgres",
                              host="localhost",
                              port="5432",
                              database="postgres")
cursor = connection.cursor()
query_tweets = "select * from accounts, parties where accounts.party_id = parties.id"
cursor.execute(query_tweets)
result = cursor.fetchall()

regexp_account_id = re.compile("\d+(?=_)")
regexp_timestamp = re.compile("(?<=\d_)[\d\-_]+")
ids = []
index = 0
pretty_results = []
data.pop(0)

for liwc_result in data:
    file_id = str(liwc_result[0]).replace(".txt", "")
    timestamp = regexp_timestamp.search(file_id).group(0).split('_')[0]
    year = timestamp.split('-')[0]
    month = int(timestamp.split('-')[1])
    quarter = 0
    if 1 <= month <= 3:
        quarter = 1
    elif 4 <= month <= 6:
        quarter = 2
    elif 7 <= month <= 9:
        quarter = 3
    elif 10 <= month <= 12:
        quarter = 4
    account_id = regexp_account_id.match(file_id)
    if account_id:
        try:
            ids.append(account_id.group(0))
            party_id = result[int(account_id.group(0)) - 1][6]
            fancy_result = [index, account_id.group(0), party_id, year, quarter] + liwc_result[1:]
            index += 1
            pretty_results.append(fancy_result)
        except IndexError:
            print(result[int(account_id.group(0))-1])

with open('../../../setup/querys/preprocessed_big5.csv', 'w') as csv_file:
    writer = csv.writer(csv_file)
    writer.writerow(table_header)

    for result in pretty_results:
        writer.writerow(result)
    csv_file.close()
