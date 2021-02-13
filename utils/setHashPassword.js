import bcrypt from 'bcrypt';

export const setHashPassword = async (user) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(+process.env.SALT_WORK_FACTOR);
    const password = await bcrypt.hash(user.password, salt);
    user.password = password;
  }
};
