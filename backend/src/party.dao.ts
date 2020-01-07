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
    public async getAllTweets(): Promise<any> {
        const db = pgp(cn);
        //language=PostgreSQL
        const query = 'SELECT * from tweets LIMIT 10';
        return db.manyOrNone<any>(query);
    }
}
