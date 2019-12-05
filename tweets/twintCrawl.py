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
    c.Proxy_host="Tor"
    c.Tor_control_port = 9051
    c.Tor_control_password = "kekse"
    c.Output = './twintTweets/' + user + '_tweets9051brewTor.csv'
    twint.run.Search(c)