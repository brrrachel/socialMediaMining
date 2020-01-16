import pgPromise from 'pg-promise';

const pgp = pgPromise({/* Initialization Options */});

const cn = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'postgres'
};

export class PartyDao {
    public async getTenTweets(): Promise<any> {
        const db = pgp(cn);
        //language=PostgreSQL
        const query = 'SELECT * from tweets LIMIT 10';
        return db.manyOrNone<any>(query);
    }

    public async getTweetCount(): Promise<any> {
        const db = pgp(cn);
        //language=PostgreSQL
        const query = ' SELECT pa.name as party, ac.name as account, tc.year, tc.month, tc.total ' +
            ' FROM tweet_count as tc, parties as pa, accounts as ac ' +
            ' WHERE pa.id = ac.party_id and tc.account_id = ac.id';
        const result = await db.manyOrNone<any>(query);
        return result.map(toTweetCountDto);
    }
}

function toTweetCountDto(tweets: any): any {
    return {
        party: tweets.party,
        account: tweets.account,
        year: tweets.year,
        month: tweets.month,
        total: tweets.total
    }
}
