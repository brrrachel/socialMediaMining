#!/bin/bash

# shellcheck disable=SC2121
set PGCLIENTENCODING=utf-8
chcp.com 65001
psql -U postgres -c "\encoding"

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" || exit ; pwd -P )

cd "$parent_path" || exit
psql -U postgres -f "querys/setupTweets.sql"
cd "../tweets/translations/tweepyTweets_unique" || exit
for filename in *.csv; do
  psql -U postgres -c "\copy tmp_tweets FROM '${filename}' delimiter ',' csv header"
done
cd "../twintTweets_unique" || exit
for filename in *.csv; do
  psql -U postgres -c "\copy tmp_tweets FROM '${filename}' delimiter ',' csv header"
done
cd "$parent_path" || exit
psql -U postgres -f "querys/finishTweets.sql"

