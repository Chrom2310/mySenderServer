import express from 'express';
import { privateUser } from '../middleware/private';
import { createEndPoint } from '../utils/endPoint';

const router = express.Router();

router.post('/endPoint', privateUser, async (req, res) => {
    // @ts-ignore;
    const user = req.user;
    const {
        name,
        typeSend,
        sample,
    } = req.body;
    const ep = await createEndPoint({
        userId: user._id,
        name,
        typeSend,
        sample,
    });
    res.json(ep);
});

export default router;