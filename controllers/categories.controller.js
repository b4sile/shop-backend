import { Category } from '../models';

class CategoryController {
  async getCategories(req, res) {
    try {
      const categories = await Category.findAll();
      res.json({ categories });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async createCategory(req, res) {
    const { name } = req.body;
    try {
      const category = await Category.create({ name });
      res.status(201).json({ category });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async updateCategory(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const category = await Category.update({ name }, { where: { id } });
      res.json({ category });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async deleteCategory(req, res) {
    const { id } = req.params;
    try {
      const category = await Category.destroy({ where: { id } });
      res.json({ category });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new CategoryController();
