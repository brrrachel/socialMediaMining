import {Router} from 'express'
import {PartyService} from "./party.service"

export const router = Router();
const partyService = new PartyService();

router.get('/', async (req, res, _) => {
    const tweets = await partyService.getTenTweets();
    return res.status(200).send(tweets);
});

router.get('/tweetCount', async (req, res, _) => {
    const tweets = await partyService.getTweetCount();
    return res.status(200).send(tweets);
});

router.get('/topics', async (req, res, _) => {
    let start = req.query.start.split('.');
    let end = req.query.end.split('.');
    let list_with_parties = req.query.parties.split(',');
    const topics = await partyService.getTopics(list_with_parties, start[2], end[2]);
    return res.status(200).send(topics);
});

