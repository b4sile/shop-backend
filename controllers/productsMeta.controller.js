import { ProductMeta } from '../models';
import { parseQueryParams } from '../utils';

class ProductMetaController {
  async getProductsMeta(req, res) {
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
      const { count, rows: productsMeta } = await ProductMeta.findAndCountAll({
        where: filter,
        order: [sort],
        limit,
        offset: range[0],
      });
      res.set({
        'Content-Range': `users: ${range[0]}-${range[1]}/${count}`,
      });
      res.json(productsMeta);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async createProductMeta(req, res) {
    const { size, quantity, productId } = req.body;
    try {
      const productMeta = await ProductMeta.create({
        size,
        quantity,
        productId,
      });
      res.status(201).json(productMeta);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async getProductMeta(req, res) {
    const { id } = req.params;
    try {
      const productMeta = await ProductMeta.findByPk(id);
      if (!productMeta) {
        throw Error('ProductMeta not found');
      }
      res.json(productMeta);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async updateProductMeta(req, res) {
    const { id } = req.params;
    const { size, quantity } = req.body;
    try {
      const productMeta = await ProductMeta.update(
        { size, quantity },
        { where: { id }, returning: true }
      );
      if (productMeta[0] === 0) {
        throw Error('ProductMeta not found');
      }
      res.json(...productMeta[1]);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async deleteProductMeta(req, res) {
    const { id } = req.params;
    try {
      const productMeta = await ProductMeta.destroy({ where: { id } });
      if (!productMeta) {
        throw Error('ProductMeta not found');
      }
      res.json({ status: 'ok' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new ProductMetaController();
