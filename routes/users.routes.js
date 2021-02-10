import { Router } from 'express';
import { UserController } from '../controllers';
import { setDefaultQueryParameters } from '../middlewares';

export const usersRoutes = Router();

usersRoutes
  .route('/')
  .get([setDefaultQueryParameters], UserController.getUsers)
  .post(UserController.createUser);

usersRoutes
  .route('/:id')
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);
