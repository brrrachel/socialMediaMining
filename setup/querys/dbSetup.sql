-- create party table
create table parties(
    id      serial primary key,
    name    varchar(32)
);

-- populate party table
insert into parties(name) values
    ('CDU'), ('SPD'), ('FDP'), ('CSU'), ('Die Linke'), ('Die Grünen'), ('AfD');

-- create account table
create table accounts(
    id          serial primary key,
    name        varchar(32),
    alias       varchar(64),
    follower    integer,
    tweet_count integer,
    party_id    integer references parties
);

-- populate account table
WITH ins (name, alias, follower, tweet_count, party) AS
         ( VALUES
           ( '@fdp', 'FDP-Hauptaccount', 350000, 0, 'FDP'),
           ( '@c_lindner', 'Christian Lindner', 362000, 0, 'FDP'),
           ( '@nicolabeerfdp', 'Nicola Beer', 15000, 0, 'FDP'),
           ( '@KatjaSuding', 'Katja Suding', 11000, 0, 'FDP'),
           ( '@spdde', 'SPD-Hauptaccount', 371000, 0, 'SPD'),
           ( '@MartinSchulz', 'Martin Schulz', 698000, 0, 'SPD'),
           ( '@Ralf_Stegner', 'Ralf Stegner', 52000, 0, 'SPD'),
           ( '@larsklingbeil', 'Lars Klingbeil', 50000, 0, 'SPD'),
           ( '@UlrichKelber', 'Ulrich Kelber', 23000, 0, 'SPD'),
           ( '@CDU', 'CDU-Hauptaccount', 297000, 0, 'CDU'),
           ( '@akk', 'Annegret Kramp-Karrenbauer', 88000, 0, 'CDU'),
           ( '@JuliaKloeckner', 'Julia Klöckner', 63000, 0, 'CDU'),
           ( '@peteraltmaier', 'Peter Altmaier', 256000, 0, 'CDU'),
           ( '@CSU', 'CSU-Hauptaccount', 196000, 0, 'CSU'),
           ( '@AndiScheuer', 'Andreas Scheuer', 50000, 0, 'CSU'),
           ( '@Die_Gruenen', 'Die Grünen-Hauptaccount', 488000, 0, 'Die Grünen'),
           ( '@Volker_Beck', 'Volker Beck', 91000, 0, 'Die Grünen'),
           ( '@RenateKuenast', 'Renate Künast', 51000, 0, 'Die Grünen'),
           ( '@bueti', 'Reinhard Bütikofer', 25000, 0, 'Die Grünen'),
           ( '@cem_oezdemir', 'Cem Özdemir', 157000, 0, 'Die Grünen'),
           ( '@AfD', 'AFD-Hauptaccount', 147000, 0, 'AfD'),
           ( '@Alice_Weidel', 'Alice Weidel', 84000, 0, 'AfD'),
           ( '@Beatrix_vStorch', 'Beatrix von Storch', 50000, 0, 'AfD'),
           ( '@MarcusPretzell', 'Marcus Pretzell', 11000, 0, 'AfD'),
           ( '@PoggenburgAndre', 'André Poggenburg', 23000, 0, 'AfD'),
           ( '@FraukePetry', 'Frauke Petry', 52000, 0, 'AfD'),
           ( '@dieLinke', 'Die Linke-Hauptaccount', 276000, 0, 'Die Linke'),
           ( '@GregorGysi', 'Gregor Gysi', 347000, 0, 'Die Linke'),
           ( '@MartinaRenner', 'Martina Renner', 14000, 0, 'Die Linke'),
           ( '@SWagenknecht', 'Sahra Wagenknecht', 412000, 0, 'Die Linke'),
           ( '@PetraPauMaHe', 'Petra Pau', 13000, 0, 'Die Linke')
         )
INSERT INTO accounts
(name, alias, follower, tweet_count, party_id)
SELECT
    ins.name, ins.alias, ins.follower, ins.tweet_count, parties.id
FROM
    parties JOIN ins
             ON ins.party = parties.name;

-- creating BigFive table
create table big5_emotions (
    id          serial primary key,
    account_id  integer references accounts,
    startDate   date,
    value       integer
);

-- creating topic table
create table topics (
    id                      serial primary key,
    account_id              integer references accounts,
    startDate               date,
    appearance_count        integer,
    appearance_percentage   integer
);

-- build tweets table
create table tweets (
                        id              BIGINT PRIMARY KEY,
                        account_id      INTEGER REFERENCES accounts,
                        conversation_id BIGINT,
                        created_at      TIMESTAMP,
                        date            DATE,
                        time            TIME,
                        timezone        TEXT,
                        user_id         BIGINT,
                        username        TEXT,
                        name            TEXT,
                        place           TEXT,
                        tweet           TEXT,
                        mentions        TEXT,
                        urls            TEXT,
                        photos          TEXT,
                        replies_count   INTEGER,
                        retweets_count  INTEGER,
                        likes_count     INTEGER,
                        hashtags        TEXT,
                        cashtags        TEXT,
                        link            TEXT,
                        retweet         BOOLEAN,
                        quote_url       TEXT,
                        video           TEXT,
                        near            TEXT,
                        geo             TEXT,
                        source          TEXT,
                        user_rt_id      TEXT,
                        user_rt         TEXT,
                        retweet_id      TEXT,
                        reply_to        TEXT,
                        retweet_date    TEXT
);

CREATE table tweet_count(
                        id BIGSERIAL PRIMARY KEY,
                        account_id integer references accounts,
                        year integer,
                        month integer,
                        total integer
);

CREATE table processed_tweets(
                        id BIGSERIAL PRIMARY KEY,
                        account_id integer references accounts,
                        year integer,
                        month integer,
                        tokens TEXT
);