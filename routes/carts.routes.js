import { Router } from 'express';
import { CartController } from '../controllers';
import { setDefaultQueryParameters } from '../middlewares';

export const cartsRoutes = Router();

cartsRoutes
  .route('/')
  .get([setDefaultQueryParameters], CartController.getCarts)
  .post(CartController.createCart);

cartsRoutes
  .route('/:id')
  .get(CartController.getCart)
  .put(CartController.updateCart)
  .delete(CartController.deleteCart);
