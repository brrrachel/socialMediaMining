INSERT INTO tweets (id, account_id, conversation_id, created_at, date, time, timezone, user_id, place, tweet, mentions,
                    urls, photos, replies_count, retweets_count, likes_count, hashtags, cashtags, link, retweet,
                    quote_url, video, near, geo, source, user_rt_id, user_rt, retweet_id, reply_to, retweet_date)
SELECT * from
       (select DISTINCT ON(t.id)
            t.id::bigint, a.id, t.conversation_id::bigint, (t.date::date + t.time::time) as created_at, t.date::DATE, t.time::TIME,
            t.timezone, t.user_id::bigint, t.place, t.tweet, t.mentions, t.urls, t.photos,
            t.replies_count::integer, t.retweets_count::integer, t.likes_count::integer, t.hashtags, t.cashtags, t.link,
            t.retweet::boolean, t.quote_url, t.video, t.near, t.geo, t.source, t.user_rt_id, t.user_rt, t.retweet_id,
            t.reply_to, t.retweet_date
        FROM tmp_tweets t join accounts a on '@'||t.username=a.name) final;

DROP TABLE tmp_tweets;