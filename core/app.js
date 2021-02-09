import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { router } from '../routes';
import dotenv from 'dotenv';

dotenv.config();

export const app = express();

app.disable('x-powered-by');

app.use(express.static(__dirname + '/tmp'));

app.use(
  logger('dev', {
    skip: () => app.get('env') === 'test',
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router);

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
