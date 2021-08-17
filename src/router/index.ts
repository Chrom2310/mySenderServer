import express from 'express';
import sender from './sender';
import users from './users';
import endPoint from './endPoint';

const routers = express.Router();

routers.use('/v1', [sender, users, endPoint])

export default routers;