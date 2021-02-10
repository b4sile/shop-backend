import { sequelize } from '../core/db';
import { DataTypes } from 'sequelize';

export const User = sequelize.define('user', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('User', 'Admin'),
    defaultValue: 'User',
  },
  confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
