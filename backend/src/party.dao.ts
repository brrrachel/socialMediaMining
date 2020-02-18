import pgPromise from 'pg-promise';

const pgp = pgPromise({/* Initialization Options */});

const cn = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'postgres'
};

const db = pgp(cn);

export class PartyDao {

    public async getTenTweets(): Promise<any> {
        //language=PostgreSQL
        const query = 'SELECT * from tweets LIMIT 10';
        return db.manyOrNone<any>(query);
    }

    public async getTweetCount(): Promise<any> {
        //language=PostgreSQL
        const query = ' SELECT pa.name as party, ac.name as account, tc.year, tc.month, tc.total ' +
            ' FROM tweet_count as tc, parties as pa, accounts as ac ' +
            ' WHERE pa.id = ac.party_id and tc.account_id = ac.id';
        const result = await db.manyOrNone<any>(query);
        return result.map(toTweetCountDto);
    }

    public async getTweetsForParty(party: string, startYear: number, endYear: number): Promise<any> {
        //language=PostgreSQL
        const query = ' SELECT pt.tokens FROM parties as pa, accounts as ac, processed_tweets as pt ' +
            'WHERE pa.id = ac.party_id and pt.account_id = ac.id and ' +
            'pa.name = $1 and $2 <= pt.year and pt.year <= $3';
        return db.manyOrNone<any>(query, [party, startYear, endYear]);
    }

    public async getTweetsForPartyPerYear(party: string, startYear: number, endYear: number): Promise<any> {
        //language=PostgreSQL
        const query = ' SELECT pt.year, pt.month, pt.tokens FROM parties as pa, accounts as ac, processed_tweets as pt ' +
            'WHERE pa.id = ac.party_id and pt.account_id = ac.id and ' +
            'pa.name = $1 and $2 <= pt.year and pt.year <= $3';
        return db.manyOrNone<{year: number, month: number, tokens: string}[]>(query, [party, startYear, endYear]);
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
