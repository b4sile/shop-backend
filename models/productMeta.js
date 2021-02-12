import { sequelize } from '../core/db';
import { DataTypes } from 'sequelize';

export const ProductMeta = sequelize.define('product_meta', {
  size: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'productIdAndSizeIndex',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    unique: 'productIdAndSizeIndex',
  },
});
