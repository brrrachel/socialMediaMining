# Crawling
We are using two different libraries for crawling, twint and tweepy. To get all tweets one has to execute the 
``tweepyCrawl.py`` file and the ``twintCrawl.py`` file. Both files take a path to a txt file which contains the account 
names we want to crawl. The results are than saved in the germanTweets folder.


Hint: make multiple username files and execute multiple crawls parallel.
```
python3 tweepyCrawl.py usernamesTweepy.txt
python3 twintCrawl.py usernamesTwint.txt
```