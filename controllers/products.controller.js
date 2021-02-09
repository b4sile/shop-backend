import { Product } from '../models';

class ProductController {
  async getProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.json({ products });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async createProduct(req, res) {
    const { title, description, price } = req.body;
    try {
      const product = await Product.create({ title, description, price });
      res.status(201).json({ product });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    const { title, description, price } = req.body;
    try {
      const product = await Product.update(
        { title, description, price },
        { where: { id } }
      );
      res.json({ product });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.destroy({ where: { id } });
      res.json({ product });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new ProductController();
