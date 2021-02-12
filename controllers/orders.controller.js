import { Order } from '../models';
import { parseQueryParams } from '../utils';

class OrderController {
  async getOrders(req, res) {
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
      const { count, rows: orders } = await Order.findAndCountAll({
        where: filter,
        order: [sort],
        limit,
        offset: range[0],
      });
      res.set({
        'Content-Range': `users: ${range[0]}-${range[1]}/${count}`,
      });
      res.json(orders);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async createOrder(req, res) {
    const { userId, amount, status } = req.body;
    try {
      const order = await Order.create({ userId, amount, status });
      res.status(201).json(order);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async getOrder(req, res) {
    const { id } = req.params;
    try {
      const order = await Order.findByPk(id);
      if (!order) {
        throw Error('Order not found');
      }
      res.json(order);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async updateOrder(req, res) {
    const { id } = req.params;
    const { userId, amount, status } = req.body;
    try {
      const order = await Order.update(
        { userId, amount, status },
        { where: { id }, returning: true }
      );
      if (order[0] === 0) {
        throw Error('Order not found');
      }
      res.json(...order[1]);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async deleteOrder(req, res) {
    const { id } = req.params;
    try {
      const order = await Order.destroy({ where: { id } });
      if (!order) {
        throw Error('Order not found');
      }
      res.json({ status: 'ok' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new OrderController();
