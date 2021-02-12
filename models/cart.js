import { sequelize } from '../core/db';
import { DataTypes } from 'sequelize';

export const Cart = sequelize.define('cart', {
  userId: {
    type: DataTypes.INTEGER,
    unique: true,
  },
});
