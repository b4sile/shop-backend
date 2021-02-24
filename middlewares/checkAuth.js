import { verifyJWTtoken } from '../utils';
import { User } from '../models';

export const checkAuth = async (req, res, next) => {
  const header = req.headers['authorization'];
  try {
    const token = header.split(' ')[1];
    const {
      data: { id },
    } = await verifyJWTtoken(token);
    const user = await User.findByPk(id);
    if (!user) {
      throw Error('User not found');
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Permission denied' });
  }
};
