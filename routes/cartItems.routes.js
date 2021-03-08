import { Router } from 'express';
import { CartItemController } from '../controllers';
import { setDefaultQueryParameters, checkAuth } from '../middlewares';

export const cartItemsRoutes = Router();

cartItemsRoutes.use([checkAuth]);

cartItemsRoutes
  .route('/')
  .get([setDefaultQueryParameters], CartItemController.getCartItems)
  .delete(CartItemController.deleteAllCartItems)
  .post(CartItemController.createCartItem);

cartItemsRoutes
  .route('/:id')
  .get(CartItemController.getCartItem)
  .put(CartItemController.updateCartItem)
  .delete(CartItemController.deleteCartItem);
