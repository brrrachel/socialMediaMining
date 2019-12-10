#googletrans library: https://pypi.org/project/googletrans/
from googletrans import Translator
import csv
import sys
import time
import json
import goslate



r = csv.reader(open(sys.argv[1]))
tweets = list(r)
for tweet in tweets:
    try:
        translator = Translator()
        translation = translator.translate(tweet[10])
        tweet[10] = translation.text
        print(tweet[10])
        time.sleep(3)
    except json.decoder.JSONDecodeError:
        print("googleTrans blocked")
        translator = goslate.Goslate()
        translation = translator.translate(tweet[10], 'en')
        tweet[10] = translation
        print(tweet[10])
        time.sleep(3)
writer = csv.writer(open("translations/" + sys.argv[1], 'w'))
writer.writerows(tweets)
