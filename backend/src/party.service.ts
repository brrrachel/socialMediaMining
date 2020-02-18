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

    public async getTopics(parties: string[], startYear: number, endYear: number): Promise<{ party: string, terms: any[] }[]> {
        let score: any[] = [];
        await Promise.all(parties.map(async party => {
            const tweets = await this.dao.getTweetsForParty(party, startYear, endYear);
            score.push({party: party, document: this.preprocessTweets(tweets)});
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

    public async getFrequencyForTerm(term: string, parties: string[], startYear: number, endYear: number): Promise<{ party: string, frequency: any[] }[]> {
        let result: { party: string, frequency: any[] }[] = [];
        await Promise.all(parties.map(async party => {
            const tweets = await this.dao.getTweetsForPartyPerYear(party, startYear, endYear);
            let frequencies: { year: number, month: number, frequency: number }[] = [];
            for (let set of tweets) {
                const splittedTokens: string[] = set.tokens.split(' ');
                const numberOfMatching: number = splittedTokens.filter(token => token === term).length;
                frequencies.push({year: set.year, month: set.month, frequency: numberOfMatching});
            }
            result.push({party: party, frequency: frequencies});
        }));
        return result;
    }

    private preprocessTweets(tweets: any): string {
        const tweets_array: string[] = Object.values(tweets).map(tweet => Object.values(tweet)[0]);
        return tweets_array.reduce((previousValue, currentValue) => previousValue.concat(' ', currentValue));
    }
}