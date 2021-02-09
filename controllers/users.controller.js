import { User } from '../models';

class UserController {
  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json({ users });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async createUser(req, res) {
    const { firstName, lastName, email, password } = req.body;
    try {
      const user = await User.create({ firstName, lastName, email, password });
      res.status(201).json({ user });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;
    try {
      const user = await User.update(
        { firstName, lastName, email, password },
        { where: { id } }
      );
      res.json({ user });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.destroy({ where: { id } });
      res.json({ user });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new UserController();
