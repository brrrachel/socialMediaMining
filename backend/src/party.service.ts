import {PartyDao} from "./party.dao";
let natural = require('natural');
let TfIdf = natural.TfIdf;

export class PartyService {
    constructor(private readonly dao = new PartyDao()) {
    }

    public async getTenTweets() {
        const results = await this.dao.getTenTweets();
        return results;
    }

    public async getTweetCount() {
        return await this.dao.getTweetCount();
    }

    public async getTopics(parties: string[], startYear: number, endYear: number): Promise<{party: string, terms: any[]}[]> {
        let score: any[] = [];
        await Promise.all(parties.map(async party => {
            const tweets = await this.dao.getTweetsForAccount(party, startYear, endYear);
            score.push({ party: party, document: this.preprocessTweets(tweets)});
        }));

        let partyList: string[] = [];
        let documentList: string[] = [];

        score.forEach(element => {
            partyList.push(element.party);
            documentList.push(element.document);
        });

        let tfidf = new TfIdf();
        for (let d = 0; d < documentList.length; d++) {
            tfidf.addDocument(documentList[d]);
        }

        let result = [];
        for (let i in partyList) {
            result.push({party: partyList[i], terms: tfidf.listTerms(i)})
        }

        return result;
    }

    private preprocessTweets(tweets: any): string {
        const tweets_array: string[] = Object.values(tweets).map(tweet => Object.values(tweet)[0]);
        return tweets_array.reduce((previousValue, currentValue) => previousValue.concat(' ', currentValue));
    }
}