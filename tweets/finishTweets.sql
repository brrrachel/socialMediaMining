INSERT INTO tweets
SELECT t.id::bigint, t.conversation_id::bigint, (t.date::date + t.time::time) as created_at, t.date::DATE, t.time::TIME, t.timezone, t.user_id::bigint,
    t.username, t.name, t.place, t.tweet, t.mentions, t.urls, t.photos, t.replies_count::integer, t.retweets_count::integer,
    t.likes_count::integer, t.hashtags, t.cashtags, t.link, t.retweet::boolean, t.quote_url, t.video, t.near, t.geo, t.source,
    t.user_rt_id, t.user_rt, t.retweet_id, t.reply_to, t.retweet_date FROM tmp_tweets t;

DROP TABLE tmp_tweets;