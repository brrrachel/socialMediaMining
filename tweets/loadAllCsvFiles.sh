#!/bin/bash

# shellcheck disable=SC2121
set PGCLIENTENCODING=utf-8
chcp.com 65001
psql -U postgres -c "\encoding"
for filename in *.csv; do
  psql -U postgres -c "\copy tweets FROM 'C:\Users\mpggo\ProjectsHpi\socialMediaMining\tweets\\${filename}' delimiter ',' csv header"
done
