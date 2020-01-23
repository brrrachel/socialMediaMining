INSERT INTO tweet_count (
    account_id,
    year,
    month,
    total
)
SELECT ac.id, tw.year, tw.month, tw.total
FROM public.accounts as ac join public.evaluated_tweets as tw
on '@'||tw.name = ac.name;

DROP table evaluated_tweets;

