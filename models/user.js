import { sequelize } from '../core/db';
import { DataTypes } from 'sequelize';
import { setHashPassword } from '../utils';
import bcrypt from 'bcrypt';
export const User = sequelize.define('user', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4, 32],
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4, 32],
    },
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
    validate: {
      len: [4, 255],
    },
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

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

User.beforeCreate(setHashPassword);
User.beforeUpdate(setHashPassword);

User.prototype.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
