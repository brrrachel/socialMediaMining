#googletrans library: https://pypi.org/project/googletrans/
from googletrans import Translator
translator = Translator()
translation = translator.translate('»Wir haben es geschafft und werden nun bis zur #Btw17 rocken - die #AfD ist stärker als je zuvor!« https://www.youtube.com/watch?v=z9h7eZu6pbE&feature=youtu.be …')
print(translation)

#for bulk translating
translations = translator.translate(['The quick brown fox', 'jumps over', 'the lazy dog'], dest='ko')
>>> for translation in translations:
...    print(translation.origin, ' -> ', translation.text)

#goslate library: https://pythonhosted.org/goslate/
import goslate
gs = goslate.Goslate()
print(gs.translate('Wir haben es geschafft und werden nun bis zur #Btw17 rocken - die #AfD ist stärker als je zuvor!« https://www.youtube.com/watch?v=z9h7eZu6pbE&feature=youtu.be …', 'en'))
