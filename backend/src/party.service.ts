import {PartyDao} from "./party.dao";

export class PartyService {
    constructor(private readonly dao = new PartyDao()) {
    }

    public async getAllTweets() {
        const results = await this.dao.getAllTweets();
        console.log(results);
        return results;
    }
}