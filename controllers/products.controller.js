import { Product } from '../models';
import { parseQueryParams } from '../utils';

class ProductController {
  async getProducts(req, res) {
    const {
      sort: querySort,
      range: queryRange,
      filter: queryFilter,
    } = req.query;
    console.log(req.query);
    try {
      const { range, sort, filter, limit } = parseQueryParams({
        queryRange,
        querySort,
        queryFilter,
      });
      const { count, rows: products } = await Product.findAndCountAll({
        where: filter,
        order: [sort],
        limit,
        offset: range[0],
      });
      res.set({
        'Content-Range': `users: ${range[0]}-${range[1]}/${count}`,
      });
      res.json(products);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async createProduct(req, res) {
    const { title, description, price } = req.body;
    try {
      const product = await Product.create({ title, description, price });
      res.status(201).json(product);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async getProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);
      res.json(product);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    const { title, description, price } = req.body;
    try {
      const productId = await Product.update(
        { title, description, price },
        { where: { id } }
      );
      res.json({ id: productId });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const productId = await Product.destroy({ where: { id } });
      res.json({ id: productId });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new ProductController();
