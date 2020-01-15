import {PartyDao} from "./party.dao";

export class PartyService {
    constructor(private readonly dao = new PartyDao()) {
    }

    public async getTenTweets() {
        const results = await this.dao.getTenTweets();
        console.log(results);
        return results;
    }

    public async getTweetCount() {
        return await this.dao.getTweetCount();
    }
}