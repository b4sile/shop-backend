import { User } from '../models';
import { createJWTtoken } from '../utils';

class UserService {
  async loginUser(email, password, isAdminPanelLogin) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw Error('User not found');
      }
      if (!(await user.isValidPassword(password))) {
        throw Error('Invalid password');
      }
      if (isAdminPanelLogin && user.role !== 'Admin') {
        throw Error("Don't have rules");
      }
      const token = await createJWTtoken(user.id);
      return { user, token };
    } catch (err) {
      throw Error(err.message);
    }
  }
}

export default new UserService();
