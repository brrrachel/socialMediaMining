#!/bin/bash

# shellcheck disable=SC2121
set PGCLIENTENCODING=utf-8
chcp.com 65001
psql -U postgres -c "\encoding"
psql -U postgres -c "\copy processed_tweets FROM 'querys/preprocessed_tweets.csv' delimiter ',' csv"
