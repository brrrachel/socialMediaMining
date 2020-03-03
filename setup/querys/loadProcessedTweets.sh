#!/bin/bash

# shellcheck disable=SC2121
set PGCLIENTENCODING=utf-8
chcp.com 65001
psql -h localhost -U postgres -d postgres -c "\encoding"
psql -h localhost -U postgres -d postgres -c "\copy processed_tweets FROM 'preprocessed_tweets.csv' delimiter ',' csv"
