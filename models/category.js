import { sequelize } from '../core/db';
import { DataTypes } from 'sequelize';

export const Category = sequelize.define('category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
