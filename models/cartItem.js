import { sequelize } from '../core/db';
import { DataTypes } from 'sequelize';

export const CartItem = sequelize.define('cart_item', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
