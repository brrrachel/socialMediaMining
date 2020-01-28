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

    public async getTweetsForAccount(party: string, start: Date, end: Date): Promise<any> {
        const db = pgp(cn);
        //language=PostgreSQL
        const query = ' SELECT tw.tweet FROM parties as pa, accounts as ac, tweets as tw ' +
            'WHERE pa.id = ac.party_id and tw.account_id = ac.id and ' +
            'pa.name = $1 and tw.created_at >= $2 and tw.created_at < $3';
        return db.manyOrNone<any>(query, [party, start, end]);
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
