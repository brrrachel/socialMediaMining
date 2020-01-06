import {Router} from 'express'
import {PartyService} from "./party.service";

export const router = Router();
const partyService = new PartyService();

router.get('/', async (req, res, _) => {
    const tweets = await partyService.getAllTweets();
    return res.status(200).send({result: tweets});
});
