#!/bin/bash

# shellcheck disable=SC2121
set PGCLIENTENCODING=utf-8
chcp.com 65001
psql -h localhost -U postgres -d postgres -c "\encoding"

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" || exit ; pwd -P )

cd "$parent_path" || exit
psql -h localhost -U postgres -d postgres -f "setupTweets.sql"
cd "../../data/translation/tweepyTweets_unique" || exit
for filename in *.csv; do
  psql -h localhost -U postgres -d postgres -c "\copy tmp_tweets FROM '${filename}' delimiter ',' csv header"
done
cd "../twintTweets_unique" || exit
for filename in *.csv; do
  psql -h localhost -U postgres -d postgres -c "\copy tmp_tweets FROM '${filename}' delimiter ',' csv header"
done
cd "$parent_path" || exit
psql -h localhost -U postgres -d postgres -f "finishTweets.sql"

