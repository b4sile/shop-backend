import { Router } from 'express';
import { OrderController } from '../controllers';
import { setDefaultQueryParameters } from '../middlewares';

export const ordersRoutes = Router();

ordersRoutes
  .route('/')
  .get([setDefaultQueryParameters], OrderController.getOrders)
  .post(OrderController.createOrder);

ordersRoutes
  .route('/:id')
  .get(OrderController.getOrder)
  .put(OrderController.updateOrder)
  .delete(OrderController.deleteOrder);
