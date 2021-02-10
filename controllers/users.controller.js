import { User } from '../models';
import { parseQueryParams } from '../utils';

class UserController {
  async getUsers(req, res) {
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
      const { count, rows: users } = await User.findAndCountAll({
        where: filter,
        order: [sort],
        limit,
        offset: range[0],
      });
      res.set({
        'Content-Range': `users: ${range[0]}-${range[1]}/${count}`,
      });
      res.json(users);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async getUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      res.json(user);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async createUser(req, res) {
    const { firstName, lastName, email, password } = req.body;
    try {
      const user = await User.create({ firstName, lastName, email, password });
      res.status(201).json(user);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;
    try {
      const userId = await User.update(
        { firstName, lastName, email, password },
        { where: { id } }
      );
      res.json({ id: userId });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const userId = await User.destroy({ where: { id } });
      res.json({ id: userId });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new UserController();
