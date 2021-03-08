import { sequelize } from '../core/db';
import { DataTypes } from 'sequelize';

export const CartItem = sequelize.define(
  'cart_item',
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    cartId: {
      type: DataTypes.INTEGER,
      unique: 'cartIdAndProductMetumIdIndex',
    },
    productMetumId: {
      type: DataTypes.INTEGER,
      unique: 'cartIdAndProductMetumIdIndex',
    },
  },
  {
    timestamps: false,
  }
);
