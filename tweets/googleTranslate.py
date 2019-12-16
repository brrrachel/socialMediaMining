# Imports the Google Cloud client library
from google.cloud import translate_v2 as translate
from google.oauth2 import service_account
import csv
import sys
from tqdm import tqdm

# Instantiates a client
credentials = service_account.Credentials.from_service_account_file('/Users/rachel/Documents/google_translate.json')
translate_client = translate.Client(credentials=credentials)

r = csv.reader(open(sys.argv[1], encoding='utf8'))
tweets = list(r)

for tweet in tqdm(tweets):
    with open('translations/' + sys.argv[1], 'a') as fp:
        translation = translate_client.translate(tweet[10], target_language='en')
        tweet[10] = translation['translatedText']
        wr = csv.writer(fp, dialect='excel')
        wr.writerow(tweet)

