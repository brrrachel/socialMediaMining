#googletrans library: https://pypi.org/project/googletrans/
from googletrans import Translator
import csv
import sys
import time

translator = Translator()

r = csv.reader(open(sys.argv[1]))
tweets = list(r)
for tweet in tweets:
    translation = translator.translate(tweet[10])
    tweet[10] = translation
    print(translation)
    sleep(1)
writer = csv.writer(open("translations/" + sys.argv[1], 'w'))
writer.writerows(lines)