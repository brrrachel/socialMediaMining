import twint
import sys

userNames = [line.rstrip('\n') for line in open("./" + sys.argv[1])]


for user in userNames:
    print(user)
    c = twint.Config()
    c.Username = user
    c.Retries_count = 100
    c.Store_csv = True
    c.Retweets = True
    c.Profile_full = True
    c.Location = True
    if user == "FraukePetry":
        c.Until = "2017-10-01"
    c.Output = './../germanTweets/twintTweets/' + user + '_tweets.csv'
    twint.run.Search(c)
