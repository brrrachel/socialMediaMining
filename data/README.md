# Crawl And Prepare Tweets
## Crawling
We are using two different libraries for crawling, twint and tweepy. To get all tweets one has to execute the 
``tweepyCrawl.py`` file and the ``twintCrawl.py`` file. Both files take a path to a txt file which contains the account 
names we want to crawl. The results are than saved in the germanTweets folder.


Hint: make multiple username files and execute multiple crawls parallel.
```
python3 tweepyCrawl.py usernamesTweepy.txt
python3 twintCrawl.py usernamesTwint.txt
```
## Translation
We are using google cloud project to translate the tweets. ATTENTION: You can't translate the tweets until you make 
yourself a google cloud account and save a creditcard as payment method. If you have a google cloud account, change the 
path in ``googleTranslate.py`` to your credentials.json file.

The `googleTranslate.py` takes the path to the original file as argument and stores the translated tweets.

```
python3 googleTranslate.py twintTweetsGerman/CDU_akk_tweets.csv
```

## Preprocessing
After crawling and translating the tweets we have to make some preprocessing. What we do and especiall how you can find 
[here](application/README.md).
