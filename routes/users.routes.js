import { Router } from 'express';
import { UserController } from '../controllers';

export const usersRoutes = Router();

usersRoutes
  .route('/')
  .get(UserController.getUsers)
  .post(UserController.createUser);

usersRoutes
  .route('/:id')
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);
