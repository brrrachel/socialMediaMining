import {fiveFactorModel, PartyDao} from "./party.dao";
import {DatePoint, getMonthFromDatePoint, MAX_TIMESPAN, Timespan} from "./time-span.model";

let natural = require('natural');
let TfIdf = natural.TfIdf;

export class PartyService {
    constructor(private readonly dao = new PartyDao()) {
    }

    public async getAllTweetCounts() {
        const startTime: DatePoint = MAX_TIMESPAN.startTime;
        const endTime: DatePoint = MAX_TIMESPAN.endTime;
        return await this.dao.getAllTweetCounts(startTime.year, getMonthFromDatePoint(startTime), endTime.year, getMonthFromDatePoint(endTime));
    }

    public async getTopics(parties: string[], timespan: Timespan): Promise<{ party: string, terms: any[] }[]> {
        let score: any[] = [];
        await Promise.all(parties.map(async party => {
            const tweets = await this.dao.getTweetsForParty(party, timespan.startTime.year, getMonthFromDatePoint(timespan.startTime), timespan.endTime.year, getMonthFromDatePoint(timespan.endTime));
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

    public async getFrequencyForTerm(term: string, parties: string[], timespan: Timespan): Promise<{ party: string, frequency: any[] }[]> {
        let result: { party: string, frequency: any[] }[] = [];
        const csuAndCduIn = parties.filter(party => party === "CSU" || party === "CDU").length;
        let partiesList: string[];
        if (csuAndCduIn == 2) {
            partiesList = parties.filter(party => (party !== "CSU" && party !== "CDU"));
            partiesList.push("CDU/CSU");
        } else {
            partiesList = parties;
        }
        await Promise.all(partiesList.map(async party => {

            const startYear: number = timespan.startTime.year;
            const endYear: number = timespan.endTime.year;
            const startMonth: number = getMonthFromDatePoint(timespan.startTime);
            const endMonth: number = getMonthFromDatePoint(timespan.endTime);

            let tweets: any[] = [];

            if (party === "CDU/CSU"){
                let tweetsCDU: any[] = await this.dao.getTweetsForPartyForTimeRange('CDU', startYear, startMonth, endYear, endMonth);
                let tweetsCSU: any[] = await this.dao.getTweetsForPartyForTimeRange('CSU', startYear, startMonth, endYear, endMonth);
                for (let year = startYear; year <= endYear; year++) {
                    for (let month = 1; month <= 12; month++) {
                        let csuTokens: string[] = tweetsCSU
                                                    .filter(row => (row.year === year) && (row.month === month))
                                                    .map(row => row.tokens);
                        let cduTokens: string[] = tweetsCDU
                                                    .filter(row => (row.year === year) && (row.month === month))
                                                    .map(row => row.tokens);
                        if (csuTokens.length > 0 || cduTokens.length > 0) {
                            tweets.push({year: year, month: month, tokens: [...csuTokens, ...cduTokens].join(' ')});
                        }
                    }
                }
            } else {
                let collectedTweets: any[] = await this.dao.getTweetsForPartyForTimeRange(party, startYear, startMonth, endYear, endMonth);
                for (let year = startYear; year <= endYear; year++) {
                    for (let month = 1; month <= 12; month++) {
                        let tokens: string[] = collectedTweets
                                        .filter(row => (row.year === year) && (row.month === month))
                                        .map(row => row.tokens);
                        if (tokens.length > 0) {
                            tweets.push({year: year, month: month, tokens: [...tokens].join(' ')});
                        }
                    }
                }
            }

            let frequencies: { year: number, month: number, frequency: number }[] = [];
            for (let set of tweets) {
                if (set.year !== 2019 && set.month !== 12) {
                    const splittedTokens: string[] = set.tokens.split(' ');
                    const numberOfMatching: number = splittedTokens.filter(token => token === term).length;
                    const totalTweetsForMonth: number = splittedTokens.length;
                    frequencies.push({year: set.year, month: set.month, frequency: (numberOfMatching/totalTweetsForMonth)});
                }
            }
            result.push({party: party, frequency: frequencies});
        }));
        return result;
    }

    private preprocessTweets(tweets: any): string {
        const tweets_array: string[] = Object.values(tweets).map(tweet => Object.values(tweet)[0]);
        return tweets_array.reduce((previousValue, currentValue) => previousValue.concat(' ', currentValue));
    }

    public async getFiveFactors(parties: string[], timespan: Timespan): Promise<{ party: string, factors: fiveFactorModel}[]> {
        let result: { party: string, factors: fiveFactorModel}[] = [];
        if (parties.filter(p => p === 'CDU' || p === 'CSU').length === 2) {
            let partyResult: fiveFactorModel = await this.dao.getFiveFactoresForCDUCSU(timespan.startTime.year, timespan.startTime.quarter, timespan.endTime.year, timespan.endTime.quarter).catch(err => console.log('five factor err', err));
            result.push({party: 'CDU/CSU', factors: partyResult});
            parties = parties.filter(p => p !== 'CDU' && p !== 'CSU');
        }

        await Promise.all(parties.map(async party => {
            let partyResult: fiveFactorModel = await this.dao.getFiveFactoresForParty(party, timespan.startTime.year, timespan.startTime.quarter, timespan.endTime.year, timespan.endTime.quarter);
            result.push({party: party, factors: partyResult});
        }));
        return result;
    }
}
