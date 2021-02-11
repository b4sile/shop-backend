import { Router } from 'express';
import { CartItemController } from '../controllers';
import { setDefaultQueryParameters } from '../middlewares';

export const cartItemsRoutes = Router();

cartItemsRoutes
  .route('/')
  .get([setDefaultQueryParameters], CartItemController.getCartItems)
  .post(CartItemController.createCartItem);

cartItemsRoutes
  .route('/:id')
  .get(CartItemController.getCartItem)
  .put(CartItemController.updateCartItem)
  .delete(CartItemController.deleteCartItem);
