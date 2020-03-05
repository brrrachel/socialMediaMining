# Crawl and Preprocess Tweets
## Crawling
1. Execute tweepyCrawl.py, which will crawl all tweets of the users in passed .txt file. Keep in mind, that tweepy only allows crawling round about 3000 tweets. If a account has more tweets you should add him to a usernamesTwint file.
2. Execute twintCrawl.py. twintCrawl takes a file as argument, which contains the usernames we want to crawl.

Hint: make multiple username files and execute multiple crawls parallel.
```
python3 tweepyCrawl.py usernamesTweepy.txt
python3 twintCrawl.py usernamesTwint.txt
```

## Preprocessing
1. We noticed some duplicated tweets and therefore we wrote getUniqueTweets.py. It check whether the tweet_id is already in the file and if so removes the tweet.
2. We are using google cloud project to translate the tweets.
ATTENTION: You can't translate the tweets until you make yourself a google cloud account and save a creditcard as payment method. If you have a google cloud account, change the path in googleTranslate.py to your credentials.json file.
3. The googleTranslate.py takes the path to the original file as argument.
```
python3 getUniqueTweets.py
python3 googleTranslate.py twintTweetsGerman/CDU_akk_tweets.csv
```