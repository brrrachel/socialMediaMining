# Imports the Google Cloud client library
from google.cloud import translate_v2 as translate
from google.oauth2 import service_account
import csv
import time
import sys
from tqdm import tqdm

# Instantiates a client
credentials = service_account.Credentials.from_service_account_file('/Users/rachel/Documents/translation3.json')
translate_client = translate.Client(credentials=credentials)

r = csv.reader(open(sys.argv[1], encoding='utf8'))
tweets = list(r)

for index in tqdm(range(len(tweets))):
    with open('translations/' + sys.argv[1], 'a') as fp:
        tweet = tweets[index]
        translation = translate_client.translate(tweet[10], target_language='en')
        tweet[10] = translation['translatedText']
        wr = csv.writer(fp, dialect='excel')
        wr.writerow(tweet)

