#!/bin/bash

# shellcheck disable=SC2121
set PGCLIENTENCODING=utf-8
chcp.com 65001
psql -h localhost -U postgres -d postgres -c "\encoding"

psql -h localhost -U postgres -d postgres -f "setupTweetCounts.sql"
psql -h localhost -U postgres -d postgres -c "\copy evaluated_tweets FROM 'total_num_of_tweets.csv' delimiter ',' csv"

psql -h localhost -U postgres -d postgres -f "finishTweetCounts.sql"