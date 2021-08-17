import express from 'express';
// rest of the code remains same
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routers from './router';
import connect from './model/connect';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
}))
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
// connect
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api', routers);
// app.use('/api', privateRouter)
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  connect()
});