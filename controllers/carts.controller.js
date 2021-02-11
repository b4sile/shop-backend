import { Cart, User } from '../models';
import { parseQueryParams } from '../utils';

class CartController {
  async getCarts(req, res) {
    const {
      sort: querySort,
      range: queryRange,
      filter: queryFilter,
    } = req.query;
    try {
      const { range, sort, filter, limit } = parseQueryParams({
        queryRange,
        querySort,
        queryFilter,
      });
      const { count, rows: carts } = await Cart.findAndCountAll({
        where: filter,
        order: [sort],
        limit,
        offset: range[0],
      });
      res.set({
        'Content-Range': `users: ${range[0]}-${range[1]}/${count}`,
      });
      res.json(carts);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async createCart(req, res) {
    const { userId } = req.body;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw Error('User not found');
      }
      const cart = await Cart.build();
      await user.setCart(cart);
      await cart.save();
      res.status(201).json(cart);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async getCart(req, res) {
    const { id } = req.params;
    try {
      const cart = await Cart.findByPk(id);
      if (!cart) {
        throw Error('Cart not found');
      }
      res.json(cart);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async updateCart(req, res) {
    const { id } = req.params;
    const { userId } = req.body;
    try {
      const cart = await Cart.update(
        { userId },
        { where: { id }, returning: true }
      );
      if (cart[0] === 0) {
        throw Error('Cart not found');
      }
      res.json(...cart[1]);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async deleteCart(req, res) {
    const { id } = req.params;
    try {
      const cart = await Cart.destroy({ where: { id } });
      if (!cart) {
        throw Error('Cart not found');
      }
      res.json({ status: 'ok' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new CartController();
