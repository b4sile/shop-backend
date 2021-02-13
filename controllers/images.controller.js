import { Image } from '../models';
import { parseQueryParams } from '../utils';
import { cloudinary, uploadFromBuffer } from '../core';

class ImageController {
  async getImages(req, res) {
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
      const { count, rows: images } = await Image.findAndCountAll({
        where: filter,
        order: [sort],
        limit,
        offset: range[0],
      });
      res.set({
        'Content-Range': `images: ${range[0]}-${range[1]}/${count}`,
      });
      res.json(images);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async getImage(req, res) {
    const { id } = req.params;
    try {
      const image = await Image.findByPk(id);
      if (!image) {
        throw Error('Image not found');
      }
      res.json(image);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async createImage(req, res) {
    const { productId, isTitleImage } = req.query;
    try {
      const promises = req.files.map(({ buffer }) => uploadFromBuffer(buffer));
      const results = await Promise.all(promises);
      const fileData = [];
      results.forEach((result, i) => {
        fileData.push({
          filename: req.files[i].originalname,
          ext: result.format,
          url: result.url,
          size: result.bytes,
          public_id: result.public_id,
          productId,
          isTitleImage,
        });
      });
      const images = await Image.bulkCreate(fileData);
      res.json({ id: images[0].id });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async updateImage(req, res) {
    const { id } = req.params;
    const { isTitleImage } = req.body;
    try {
      const image = await Image.findByPk(id);
      if (!image) {
        throw Error('Image not found');
      }
      await image.update({ isTitleImage });
      res.json(image);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async deleteImage(req, res) {
    const { id } = req.params;
    try {
      const image = await Image.findByPk(id);
      if (!image) {
        throw Error('Image not found');
      }
      await cloudinary.uploader.destroy(image.public_id);
      await image.destroy();
      res.json({ status: 'ok' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new ImageController();
