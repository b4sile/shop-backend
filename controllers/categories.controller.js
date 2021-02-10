import { Category } from '../models';
import { parseQueryParams } from '../utils';

class CategoryController {
  async getCategories(req, res) {
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
      const { count, rows: categories } = await Category.findAndCountAll({
        where: filter,
        order: [sort],
        limit,
        offset: range[0],
      });
      res.set({
        'Content-Range': `users: ${range[0]}-${range[1]}/${count}`,
      });
      res.json(categories);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async getCategory(req, res) {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);
      res.json(category);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async createCategory(req, res) {
    const { name } = req.body;
    try {
      const category = await Category.create({ name });
      res.status(201).json(category);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async updateCategory(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const categoryId = await Category.update({ name }, { where: { id } });
      res.json({ id: categoryId });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async deleteCategory(req, res) {
    const { id } = req.params;
    try {
      const categoryId = await Category.destroy({ where: { id } });
      res.json({ id: categoryId });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new CategoryController();
