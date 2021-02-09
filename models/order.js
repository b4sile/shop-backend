import { sequelize } from '../core/db';
import { DataTypes } from 'sequelize';

export const Order = sequelize.define('order', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
