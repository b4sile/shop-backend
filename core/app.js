import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { router } from '../routes';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const app = express();

app.disable('x-powered-by');

const shopRoot = path.join(__dirname, '../build/shop');
const adminRoot = path.join(__dirname, '../build/admin');

app.use(
  logger('dev', {
    skip: () => app.get('env') === 'test',
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router);

app.use(express.static(shopRoot));
app.use(express.static(adminRoot));

app.get('/admin', (req, res) => {
  res.sendFile('index.html', { root: adminRoot });
});

app.get('/*', (req, res) => {
  res.sendFile('index.html', { root: shopRoot });
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});
