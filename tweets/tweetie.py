import twint
c = twint.Config()
c.Username = "Ralf_Stegner"
c.Retries_count = 100
c.Store_csv = True
c.Output = "spd_stegner_tweets.csv"
twint.run.Search(c)