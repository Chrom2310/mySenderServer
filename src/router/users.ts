import express from 'express';
import { privateUser } from '../middleware/private';
import { createUser, createUserModel, userToken, userLogin } from '../utils/user';
const router = express.Router();

router.post('/user', async (req, res) => {
  const user = createUser(req.body, true);
  try {
    const um = await createUserModel(user);
    res.cookie('token', userToken(um._id));
    res.json(um);
  } catch (error) {
    res.json(error);
  }
});

router.post('/user/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    const { user, token } = await userLogin(login, password);
    res.cookie('token', token);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
})

router.get('/user/logout', privateUser, (req, res) => {
  res.clearCookie('token');
  res.send('ok');
});

export default router;