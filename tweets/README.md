# Load tweets in to database
# Preperation
1. Make sure you have Setup a Postgres Database.
2. Prepare your Postgres Password file.
   1. search for the pgpass.conf file (Windows ```%APPDATA%/postgresql/pgpass.conf```)
   2. If it doesn't exist -> create it
   3. fill in this line depending on your database setup 
   ```hostname:port:database:username:password```  and save.
3. Prepare all Tweets as .csv-Files


# 
1. Create a table 'tweets' that has all the fields you cover in your csv-Files
2. Go to the folder with all your Tweets gathered and execute the following script:
```
loadAllCsvFiles.sh
```