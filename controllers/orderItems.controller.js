import { OrderItem } from '../models';
import { parseQueryParams } from '../utils';

class OrderItemController {
  async getOrderItems(req, res) {
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
      const { count, rows: orderItems } = await OrderItem.findAndCountAll({
        where: filter,
        order: [sort],
        limit,
        offset: range[0],
      });
      res.set({
        'Content-Range': `users: ${range[0]}-${range[1]}/${count}`,
      });
      res.json(orderItems);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async createOrderItem(req, res) {
    const {
      orderId,
      size,
      title,
      description,
      price,
      discount,
      quantity,
      product_metaId: productMetumId,
    } = req.body;
    try {
      const orderItem = await OrderItem.create({
        orderId,
        size,
        title,
        description,
        price,
        discount,
        quantity,
        productMetumId,
      });
      res.status(201).json(orderItem);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async getOrderItem(req, res) {
    const { id } = req.params;
    try {
      const orderItem = await OrderItem.findByPk(id);
      if (!orderItem) {
        throw Error('OrderItem not found');
      }
      res.json(orderItem);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async updateOrderItem(req, res) {
    const { id } = req.params;
    const {
      orderId,
      size,
      title,
      description,
      price,
      discount,
      quantity,
      productMetumId,
    } = req.body;
    try {
      const orderItem = await OrderItem.update(
        {
          orderId,
          size,
          title,
          description,
          price,
          discount,
          quantity,
          productMetumId,
        },
        { where: { id }, returning: true }
      );
      if (orderItem[0] === 0) {
        throw Error('OrderItem not found');
      }
      res.json(...orderItem[1]);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async deleteOrderItem(req, res) {
    const { id } = req.params;
    try {
      const orderItem = await OrderItem.destroy({ where: { id } });
      if (!orderItem) {
        throw Error('OrderItem not found');
      }
      res.json({ status: 'ok' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new OrderItemController();
