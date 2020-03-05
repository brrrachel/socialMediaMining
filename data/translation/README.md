# Translation
We are using google cloud project to translate the tweets. ATTENTION: You can't translate the tweets until you make 
yourself a google cloud account and save a creditcard as payment method. If you have a google cloud account, change the 
path in ``googleTranslate.py`` to your credentials.json file.

The `googleTranslate.py` takes the path to the original file as argument and stores the translated tweets.

```
python3 googleTranslate.py twintTweetsGerman/CDU_akk_tweets.csv
```