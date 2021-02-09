import { sequelize } from '../core/db';
import { DataTypes } from 'sequelize';

export const ProductMeta = sequelize.define('product_meta', {
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
