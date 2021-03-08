import { User, Cart } from '../models';
import { parseQueryParams } from '../utils';
import { UserService } from '../services';

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

  async getMe(req, res) {
    try {
      res.json(req.user);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async login(req, res) {
    const { isAdminPanelLogin } = req.query;
    const { email, password, cartItems } = req.body;
    try {
      const { user, token } = await UserService.loginUser(
        email,
        password,
        isAdminPanelLogin,
        cartItems
      );
      res.json({ user, token });
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  }

  async getUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw Error('User not found');
      }
      res.json(user);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async createUser(req, res) {
    const { firstName, lastName, email, password } = req.body;
    try {
      const user = await User.create({ firstName, lastName, email, password });
      Cart.create({ userId: user.id });
      res.status(201).json(user);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { firstName, lastName, email, password, role } = req.body;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw Error('User not found');
      }
      await user.update({ firstName, lastName, email, password, role });
      res.json(user);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.destroy({ where: { id } });
      if (!user) {
        throw Error('User not found');
      }
      res.json({ status: 'ok' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new UserController();
