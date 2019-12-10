#googletrans library: https://pypi.org/project/googletrans/
from googletrans import Translator
import csv
import sys
import time
import json
import goslate
from tqdm import tqdm



r = csv.reader(open(sys.argv[1], encoding='utf8'))
tweets = list(r)
result = list()
for tweet in tqdm(tweets):
    try:
        translator = Translator()
        translation = translator.translate(tweet[10])
        tweet[10] = translation.text
        result.append(tweet)
        time.sleep(1)
    except json.decoder.JSONDecodeError:
        translator = goslate.Goslate()
        translation = translator.translate(tweet[10], 'en')
        tweet[10] = translation
        time.sleep(1)
        result.append(tweet)
writer = csv.writer(open("translations/" + sys.argv[1], 'w', encoding="utf8"))
writer.writerows(result)
