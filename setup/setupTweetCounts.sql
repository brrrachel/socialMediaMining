CREATE TABLE evaluated_tweets
(
    name text COLLATE pg_catalog."default",
    start_time timestamp without time zone,
    end_time timestamp without time zone,
    count integer,
    id bigserial primary key
)
