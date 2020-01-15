INSERT INTO tweet_count (
    account_id,
    start_time,
    "count"
)
SELECT ac.id, tw.start_time, tw.count
FROM public.accounts as ac join public.evaluated_tweets as tw
on '@'||tw.name = ac.name;

DROP table evaluated_tweets;