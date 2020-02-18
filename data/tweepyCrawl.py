import tweepy
# from tweepy import OAuthHandler
# from tweepy import API
from tweepy.streaming import StreamListener
import csv
import re
from googletrans import Translator
from datetime import datetime
import goslate
import json

def remove_emoji(string):
    emoji_pattern = re.compile("["
                           u"\U0001F600-\U0001F64F"  # emoticons
                            u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                            u"\U0001F680-\U0001F6FF"  # transport & map symbols
                            u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                            u"\U00002702-\U000027B0"
                            u"\U000024C2-\U0001F251"
                            u"\U0001f926-\U0001f937"
                            u'\U00010000-\U0010ffff'
                            u"\u200d"
                            u"\u2640-\u2642"
                            u"\u2600-\u2B55"
                            u"\u23cf"
                            u"\u23e9"
                            u"\u231a"
                            u"\u3030"
                            u"\ufe0f"
                           "]+", flags=re.UNICODE)
    return emoji_pattern.sub(r'', string)

access_token = "48627248-7Grk3w7VWA1sYqv0NlAB15Ua34p7CVUkapIEghoUx"
access_token_secret = "6KkGBhO8kLN7NE2eEqATf8NlcCvgeWX8VT3nshkx3KekE"
consumer_key = "26A5UDJd16TSP3AuvzSCMtGWY"
consumer_secret = "QFaZxdGAKw4W4mjgFBhsRyftGx055Pd3eX92DmWPwxGJolXpZS"


auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth,wait_on_rate_limit=True)


userNames = [line.rstrip('\n') for line in open("./usernamesTweepy.txt")]

translator = Translator()

for user in userNames:
    print(user)
    csvFile = open('./tweepyTweets/' + user + 'Result.csv', 'a')
    csvWriter = csv.writer(csvFile)
    try:
        csvWriter.writerow(['id','conversation_id', 'created_at', 'date', 'time', 'timezone', 'user_id', 'username', 'name', 'place', 'tweet', 'mentions', 'urls', 'photos', 'replies_count', 'retweets_count', 'likes_count', 'hashtags', 'cashtags', 'link', 'retweet', 'quote_url', 'video', 'near', 'geo', 'source', 'user_rt_id', 'user_rt', 'retweet_id', 'reply_to', 'retweet_date'])

        for tweet in tweepy.Cursor(api.user_timeline,id=user, tweet_mode='extended').items():
            tweetText = str(tweet.full_text).replace("&amp;","&")
            tweetTextNoEmojis = remove_emoji(tweetText)
            print(tweetTextNoEmojis)
            
            id = tweet.id_str
            conversation_id = '' 

            createdAtDate = tweet.created_at
            date = str(createdAtDate.year) + "-" + str(createdAtDate.month) + "-" + str(createdAtDate.day)
            time = str(createdAtDate.hour) + ":" + str(createdAtDate.minute) + ":" + str(createdAtDate.second)
            timezone = createdAtDate.tzinfo
                        
            user_id = tweet.user.id_str
            username = tweet.user.screen_name
            name = tweet.user.name
            place = tweet.place
            mentions = tweet.entities['user_mentions']
            urls = tweet.entities['urls']
            photos = ''
            replies_count = tweet.contributors
            retweets_count = tweet.retweet_count
            likes_count = tweet.favorite_count
            hashtags = tweet.entities['hashtags']
            cashtags = ''
            link = ''
            retweet = ''
            quote_url = ''
            video = ''
            near = ''
            geo = tweet.geo
            source = ''
            user_rt_id = ''
            user_rt = ''
            retweet_id = ''
            reply_to = ''
            retweet_date = ''
            csvWriter.writerow([id,conversation_id, createdAtDate, date, time, timezone, user_id, username, name, place, tweetTextNoEmojis, mentions, urls, photos, replies_count, retweets_count, likes_count, hashtags, cashtags, link, retweet, quote_url, video, near, geo, source, user_rt_id, user_rt, retweet_id, reply_to, retweet_date])
            #time.sleep(3)
        csvFile.close()
    except tweepy.TweepError as e:
        print(user+" : "+str(e))
    except json.decoder.JSONDecodeError:
        continue





