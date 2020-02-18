# Setup Database

In the following the steps to setup the database should be explained. Therefor install postgres.

## Create .pgpass 
A common way to authenticate automatically: [Guideline](https://tableplus.com/blog/2019/09/how-to-use-pgpass-in-postgresql.html)

## Load files into Database
```
sh buildDB.sh
sh loadAllCsvFiles.sh
sh loadTweetCountFiles.sh
sh loadProcessedTweets.sh
```

## Remove all Tables from Database
```
sh dropDB.sh
```