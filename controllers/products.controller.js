import { Product, ProductMeta } from '../models';
import { parseQueryParams } from '../utils';
import { sequelize } from '../core/db';
import { Op } from 'sequelize';

class ProductController {
  async getProducts(req, res) {
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
      const { count, rows: products } = await Product.findAndCountAll({
        where: filter,
        order: [sort],
        limit,
        offset: range[0],
        include: ProductMeta,
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
    const {
      title,
      description,
      discount,
      price,
      categoryId,
      product_meta,
    } = req.body;
    const t = await sequelize.transaction();
    try {
      const product = await Product.create(
        {
          title,
          description,
          price,
          categoryId,
          discount,
          product_meta,
        },
        {
          transaction: t,
        }
      );
      await Promise.all(
        product_meta.map((meta) =>
          ProductMeta.create(
            { ...meta, productId: product.id },
            { transaction: t }
          )
        )
      );
      await t.commit();
      res.status(201).json(product);
    } catch (err) {
      await t.rollback();
      res.status(404).json({ error: err.message });
    }
  }

  async getProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id, { include: ProductMeta });
      if (!product) {
        throw Error('Product not found');
      }
      res.json(product);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      discount,
      categoryId,
      product_meta,
    } = req.body;
    const t = await sequelize.transaction();
    try {
      const product = await Product.update(
        { title, description, price, categoryId, discount },
        { where: { id }, transaction: t, returning: true }
      );
      if (product[0] === 0) {
        throw Error('Product not found');
      }
      const productsMetaIds = product_meta.map((meta) => meta.id);
      if (productsMetaIds.length > 0) {
        await ProductMeta.destroy({
          where: {
            [Op.and]: [
              { productId: id },
              { id: { [Op.notIn]: productsMetaIds } },
            ],
          },
          transaction: t,
        });
      } else {
        await ProductMeta.destroy({ where: { productId: id }, transaction: t });
      }
      const promises = product_meta.map(({ size, quantity, id: productId }) =>
        productId
          ? ProductMeta.update(
              { size, quantity },
              { where: { id: productId }, transaction: t }
            )
          : ProductMeta.create(
              { size, quantity, productId: id },
              { transaction: t }
            )
      );
      await Promise.all(promises);
      await t.commit();
      res.json(...product[1]);
    } catch (err) {
      await t.rollback();
      res.status(404).json({ error: err.message });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.destroy({ where: { id } });
      if (!product) {
        throw Error('Product not found');
      }
      res.json({ status: 'ok' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new ProductController();
