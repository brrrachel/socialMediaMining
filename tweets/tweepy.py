import tweepy
# from tweepy import OAuthHandler
# from tweepy import API
from tweepy.streaming import StreamListener
import json
import csv


access_token = "48627248-7Grk3w7VWA1sYqv0NlAB15Ua34p7CVUkapIEghoUx"
access_token_secret = "6KkGBhO8kLN7NE2eEqATf8NlcCvgeWX8VT3nshkx3KekE"
consumer_key = "26A5UDJd16TSP3AuvzSCMtGWY"
consumer_secret = "QFaZxdGAKw4W4mjgFBhsRyftGx055Pd3eX92DmWPwxGJolXpZS"


auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth,wait_on_rate_limit=True)


userNames = [line.rstrip('\n') for line in open("./usernames.txt")]


for user in userNames:
    print(user)
    print('foobar')
    csvFile = open(user + 'Result.csv', 'a')
    csvWriter = csv.writer(csvFile)
    x = 0
    try:
        print('test')
        for tweet in tweepy.Cursor(api.user_timeline,id=user).items(10):
            if x == 0:
                print('write headers')
                csvWriter.writerow(['Tweet ID', 'User ID', 'Username', 'Mentions', 'Fav Count', 'Hashtags', 'Date', 'Tweet'])
                x++
                print(tweet.id)
            csvWriter.writerow([tweet.id, tweet.user.id_str, tweet.user.name, tweet.entities['user_mentions'], tweet.favorite_count, tweet.entities['hashtags'], tweet.created_at, tweet.text.encode('utf-8')])
        csvFile.close()
    except tweepy.TweepError as e:
        print(user+" : "+str(e))
        #with open("./usernames/errors.txt", "a", encoding="utf-8") as f:
        #    f.write(user + "," + str(e) + "\n")
        #    f.close()






