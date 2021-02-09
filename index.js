import { sequelize, app } from './core';
import './models';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8080;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`);
  });
});
