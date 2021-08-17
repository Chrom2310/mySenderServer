import { getUser } from "../utils/user";
import * as express from 'express';

export async function privateUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) {
    try {
        const { token } = req.cookies;
        console.log('token', token);
        if (!token && token.length === 0) {
            res.status(403);
        }
        const user = await getUser(token);
        if (user) {
            // @ts-ignore
            req.user = user;
        }else res.status(403);
        next();
    } catch (error) {
        res.status(403);
        next();
    }
}