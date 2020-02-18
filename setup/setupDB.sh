#!/bin/bash

cd querys
sh buildDb.sh
sh loadAllCsvFiles.sh
sh loadProcessedTweets.sh
sh loadTweetCountFiles.sh
#sh loadBig5.sh