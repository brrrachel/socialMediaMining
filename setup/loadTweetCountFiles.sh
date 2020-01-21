#!/bin/bash

# shellcheck disable=SC2121
set PGCLIENTENCODING=utf-8
chcp.com 65001
psql -U postgres -c "\encoding"

psql -U postgres -f "querys/setupTweetCounts.sql"
psql -U postgres -c "\copy evaluated_tweets FROM 'querys/total_num_of_tweets.csv' delimiter ',' csv"

psql -U postgres -f "querys/finishTweetCounts.sql"