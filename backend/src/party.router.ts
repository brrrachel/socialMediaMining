import {Router} from 'express'
import {PartyService} from "./party.service"

export const router = Router();
const partyService = new PartyService();

router.get('/tweetCount', async (req, res, _) => {
    const tweets = await partyService.getTweetCount();
    return res.status(200).send(tweets);
});

router.get('/topics/frequency', async (req, res, _) => {
    const timespan = JSON.parse(req.query.timespan);
    const list_with_parties = req.query.parties.split(',');
    const topics = await partyService.getTopics(list_with_parties, timespan);
    return res.status(200).send(topics);
});

router.get('/topics/development', async (req, res, _) => {
    const timespan = JSON.parse(req.query.timespan);
    const list_with_parties = req.query.parties.split(',');
    const term = req.query.term;
    const topics = await partyService.getFrequencyForTerm(term, list_with_parties, timespan);
    return res.status(200).send(topics);
});

router.get('/fiveFactor', async (req, res, _) => {
    let timespam = JSON.parse(req.query.timespan);
    let list_with_parties = req.query.parties.split(',');
    const topics = await partyService.getFiveFactors(list_with_parties, timespam);
    return res.status(200).send(topics);
});

