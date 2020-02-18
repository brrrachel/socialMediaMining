#!/bin/bash

# shellcheck disable=SC2121
set PGCLIENTENCODING=utf-8
chcp.com 65001
psql -U postgres -c "\encoding"

psql -U postgres -c "\copy big5_emotions FROM 'five-factor-values.csv' delimiter ',' csv"
