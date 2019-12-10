#googletrans library: https://pypi.org/project/googletrans/
from googletrans import Translator
import csv
import sys
import time
import json
import goslate



r = csv.reader(open(sys.argv[1], encoding='utf8'))
tweets = list(r)
result = list()
for tweet in tweets:
    try:
        translator = Translator()
        translation = translator.translate(tweet[10])
        tweet[10] = translation.text
        result.append(tweet)
        print(tweet[10])
        time.sleep(3)
    except json.decoder.JSONDecodeError:
        print("googleTrans blocked")
        translator = goslate.Goslate()
        translation = translator.translate(tweet[10], 'en')
        tweet[10] = translation
        result.append(tweet)
        print(tweet[10])
        time.sleep(3)
writer = csv.writer(open("translations/" + sys.argv[1], 'w', encoding="utf8"))
writer.writerows(result)
