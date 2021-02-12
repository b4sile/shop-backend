import { Router } from 'express';
import { OrderItemController } from '../controllers';
import { setDefaultQueryParameters } from '../middlewares';

export const orderItemsRoutes = Router();

orderItemsRoutes
  .route('/')
  .get([setDefaultQueryParameters], OrderItemController.getOrderItems)
  .post(OrderItemController.createOrderItem);

orderItemsRoutes
  .route('/:id')
  .get(OrderItemController.getOrderItem)
  .put(OrderItemController.updateOrderItem)
  .delete(OrderItemController.deleteOrderItem);
