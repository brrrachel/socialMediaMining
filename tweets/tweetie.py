import twint
c = twint.Config()
c.Username = "larsklingbeil"
c.Retries_count = 100
c.Store_csv = True
c.Output = "spd_klingbeil_tweets.csv"
twint.run.Search(c)