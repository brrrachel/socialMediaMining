import pgPromise from 'pg-promise';
import {getMonthFromDatePoint} from "./time-span.model";

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

    public async getAllTweetCounts(startYear: number, startMonth: number, endYear: number, endMonth: number): Promise<any> {
        //language=PostgreSQL
        const query = ' SELECT pa.name as party, ac.name as account, tc.year, tc.month, tc.total ' +
            ' FROM tweet_count as tc, parties as pa, accounts as ac ' +
            ' WHERE pa.id = ac.party_id and tc.account_id = ac.id and ' +
            ' ($1 < tc.year or ($1 = tc.year and $2 <= tc.month)) and ' +
            ' (tc.year < $3 or (tc.year = $3 and tc.month < $4))';
        const result = await db.manyOrNone<any>(query, [startYear, startMonth, endYear, endMonth]);
        return result.map(toTweetCountDto);
    }

    public async getTweetCountForParty(party: string, startYear: number, startMonth: number, endYear: number, endMonth: number): Promise<any> {
        //language=PostgreSQL
        const query = ' SELECT tc.year, tc.month, sum(tc.total) as total ' +
            ' FROM tweet_count as tc, parties as pa, accounts as ac ' +
            ' WHERE pa.id = ac.party_id and tc.account_id = ac.id and pa.name = $1 and' +
            ' ($2 < tc.year or ($2 = tc.year and $3 <= tc.month)) and ' +
            ' (tc.year < $4 or (tc.year = $4 and tc.month < $5))' +
            ' group by tc.year, tc.month';
        return await db.manyOrNone<{name: string, year: number, month: number, total: number}[]>(query, [party, startYear, startMonth, endYear, endMonth]);
    }

    public async getTweetsForParty(party: string, startYear: number, startMonth: number, endYear: number, endMonth: number): Promise<any> {
        //language=PostgreSQL
        const query = ' SELECT pt.tokens FROM parties as pa, accounts as ac, processed_tweets as pt ' +
            ' WHERE pa.id = ac.party_id and pt.account_id = ac.id and pa.name = $1 and ' +
            ' ($2 < pt.year or ($2 = pt.year and $3 <= pt.month)) and ' +
            ' (pt.year < $4 or (pt.year = $4 and pt.month < $5))';
        return db.manyOrNone<any>(query, [party, startYear, startMonth, endYear, endMonth]);
    }

    public async getTweetsForPartyForTimeRange(party: string, startYear: number, startMonth: number, endYear: number, endMonth: number): Promise<any> {
        //language=PostgreSQL
        const query = ' SELECT pt.year, pt.month, pt.tokens FROM parties as pa, accounts as ac, processed_tweets as pt ' +
            ' WHERE pa.id = ac.party_id and pt.account_id = ac.id and pa.name = $1 and ' +
            ' ($2 < pt.year or ($2 = pt.year and $3 <= pt.month)) and ' +
            ' (pt.year < $4 or (pt.year = $4 and pt.month < $5))';
        return db.manyOrNone<{year: number, month: number, tokens: string}[]>(query, [party, startYear, startMonth, endYear, endMonth]);
    }

    public async getFiveFactoresForParty(party: string, startYear: number, startQuarter: number, endYear: number, endQuarter: number): Promise<any> {
        //language=PostgreSQL
        const query = ' SELECT avg(fac.agreeableness) as agreeableness, avg(fac.conscientiousness) as conscientiousness, avg(fac.extraversion) as extraversion, avg(fac.neuroticism) as neuroticism, avg(fac.openness) as openness ' +
            ' FROM public.parties as pa, public.accounts as ac, public.big5_emotions as fac ' +
            ' WHERE pa.id = ac.party_id and pa.name = $1 and fac.account_id = ac.id ' +
            ' and ($2 < fac.year or ($2 = fac.year and $3 <= fac.quarter)) ' +
            ' and (fac.year < $4 or (fac.year = $4 and fac.quarter < $5));';
        return db.manyOrNone<fiveFactorModel>(query, [party, startYear, startQuarter, endYear, endQuarter]);
    }

    public async getFiveFactoresForCDUCSU(startYear: number, startQuarter: number, endYear: number, endQuarter: number): Promise<any> {
        //language=PostgreSQL
        const query = ' SELECT avg(fac.agreeableness) as agreeableness, avg(fac.conscientiousness) as conscientiousness, avg(fac.extraversion) as extraversion, avg(fac.neuroticism) as neuroticism, avg(fac.openness) as openness ' +
            ' FROM public.parties as pa, public.accounts as ac, public.big5_emotions as fac ' +
            ' WHERE pa.id = ac.party_id and (pa.name = \'CSU\' or pa.name = \'CDU\') and fac.account_id = ac.id ' +
            ' and ($1 < fac.year or ($1 = fac.year and $2 <= fac.quarter)) ' +
            ' and (fac.year < $3 or (fac.year = $3 and fac.quarter < $4));';
        return db.manyOrNone<fiveFactorModel>(query, [startYear, startQuarter, endYear, endQuarter]);
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

export interface fiveFactorModel {
    agreeableness: number;
    conscientiousness: number;
    extraversion: number;
    neuroticism: number;
    openness: number;
}