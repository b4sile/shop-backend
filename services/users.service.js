import { User, Cart, CartItem } from '../models';
import { createJWTtoken } from '../utils';

class UserService {
  async loginUser(email, password, isAdminPanelLogin, cartItems) {
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
      if (cartItems) {
        const data = [];
        const { id: cartId } = await Cart.findOne({
          where: { userId: user.id },
        });
        if (!(await CartItem.findOne({ where: { cartId } }))) {
          for (const [productMetumId, { quantity }] of Object.entries(
            cartItems
          )) {
            data.push({ cartId, productMetumId, quantity });
          }
        }
        await CartItem.bulkCreate(data);
      }
      const token = await createJWTtoken(user.id);
      return { user, token };
    } catch (err) {
      throw Error(err.message);
    }
  }
}

export default new UserService();
