import twint
c = twint.Config()
c.Username = "Alice_Weidel"
c.Retries_count = 100
c.Store_csv = True
c.Retweets = True
c.Profile_full = True
c.Location = True
c.Output = "afd_weidel_tweets.csv"
twint.run.Search(c)