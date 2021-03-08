import { Router } from 'express';
import { UserController } from '../controllers';
import { setDefaultQueryParameters, checkAuth, permit } from '../middlewares';

export const usersRoutes = Router();

usersRoutes.route('/signin').post(UserController.login);

usersRoutes.route('/me').get([checkAuth], UserController.getMe);

usersRoutes
  .route('/')
  .get(
    [checkAuth, permit('Admin'), setDefaultQueryParameters],
    UserController.getUsers
  )
  .post(UserController.createUser);

usersRoutes.use([checkAuth, permit('Admin')]);

usersRoutes
  .route('/:id')
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);
