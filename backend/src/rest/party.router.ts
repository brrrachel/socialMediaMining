import {Router} from 'express'

export const router = Router();

router.get('/', (req, res, _) => {
    return res.status(200).send({text: 'foobar'});
});
