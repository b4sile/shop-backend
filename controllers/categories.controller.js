import { Category } from '../models';
import { parseQueryParams } from '../utils';

class CategoryController {
  async getCategories(req, res) {
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
      if (!category) {
        throw Error('Category not found');
      }
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
      const category = await Category.update(
        { name },
        { where: { id }, returning: true }
      );
      if (category[0] === 0) {
        throw Error('Category not found');
      }
      res.json(...category[1]);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async deleteCategory(req, res) {
    const { id } = req.params;
    try {
      const category = await Category.destroy({ where: { id } });
      if (!category) {
        throw Error('Category not found');
      }
      res.json({ status: 'ok' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new CategoryController();
