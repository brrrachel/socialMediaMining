#googletrans library: https://pypi.org/project/googletrans/
from googletrans import Translator
import csv
import sys
import time
import json
import goslate
from tqdm import tqdm



r = csv.reader(open(sys.argv[1]))
tweets = list(r)
for tweet in tqdm(tweets):
    try:
        translator = Translator()
        translation = translator.translate(tweet[10])
        tweet[10] = translation.text
        time.sleep(1)
    except json.decoder.JSONDecodeError:
        print("googleTrans blocked")
        translator = goslate.Goslate()
        translation = translator.translate(tweet[10], 'en')
        tweet[10] = translation
        time.sleep(1)
writer = csv.writer(open("translations/" + sys.argv[1], 'w'))
writer.writerows(tweets)
