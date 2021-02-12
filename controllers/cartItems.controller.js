import { CartItem } from '../models';
import { parseQueryParams } from '../utils';

class CartItemController {
  async getCartItems(req, res) {
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
      const { count, rows: cartItems } = await CartItem.findAndCountAll({
        where: filter,
        order: [sort],
        limit,
        offset: range[0],
      });
      res.set({
        'Content-Range': `users: ${range[0]}-${range[1]}/${count}`,
      });
      res.json(cartItems);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async createCartItem(req, res) {
    const { cartId, quantity, product_metaId: productMetumId } = req.body;
    try {
      const cartItem = await CartItem.create({
        cartId,
        quantity,
        productMetumId,
      });
      res.status(201).json(cartItem);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async getCartItem(req, res) {
    const { id } = req.params;
    try {
      const cartItem = await CartItem.findByPk(id);
      if (!cartItem) {
        throw Error('CartItem not found');
      }
      res.json(cartItem);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async updateCartItem(req, res) {
    const { id } = req.params;
    const { cartId, quantity, product_metaId: productMetumId } = req.body;
    try {
      const cartItem = await CartItem.update(
        { cartId, quantity, productMetumId },
        { where: { id }, returning: true }
      );
      if (cartItem[0] === 0) {
        throw Error('CartItem not found');
      }
      res.json(...cartItem[1]);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async deleteCartItem(req, res) {
    const { id } = req.params;
    try {
      const cartItem = await CartItem.destroy({ where: { id } });
      if (!cartItem) {
        throw Error('CartItem not found');
      }
      res.json({ status: 'ok' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new CartItemController();
