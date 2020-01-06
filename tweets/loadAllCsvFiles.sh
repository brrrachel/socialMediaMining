#!/bin/bash

# shellcheck disable=SC2121
set PGCLIENTENCODING=utf-8
chcp.com 65001
psql -U postgres -c "\encoding"
psql -U postgres -f "C:\Users\mpggo\ProjectsHpi\socialMediaMining\tweets\setupTweets.sql"
for filename in *.csv; do
  psql -U postgres -c "\copy tmp_tweets FROM '${filename}' delimiter ',' csv header"
done
psql -U postgres -f "C:\Users\mpggo\ProjectsHpi\socialMediaMining\tweets\finishTweets.sql"
