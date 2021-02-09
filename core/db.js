import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_NAME, DB_USER, DB_PASS, DB_HOSTNAME } = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: 'postgres',
  host: DB_HOSTNAME,
});
