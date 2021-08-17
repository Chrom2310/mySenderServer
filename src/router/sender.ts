import express from 'express';
import { searchEndPoint } from '../utils/endPoint';
import { createSender } from '../utils/sender';
const router = express.Router();

router.post('/sender/:endPoint', async (req ,res ) => {
    const { endPoint } = req.params;
    const {
        token,
        ...messages
    } = req.body;
    try {
        const ep = await searchEndPoint(token, endPoint);
        const sender = await createSender(
            {
                endPointId: ep._id,
                messages,
            }
        );
        res.json(sender);
    } catch (error) {
        switch (error) {
            case 'endPoint не существует':
                res.status(404).json(error);
                break;
            default:
                res.json(error);
                break;
        }
    }
});

export default router;