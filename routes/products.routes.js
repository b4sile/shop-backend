import { Router } from 'express';
import { ProductController } from '../controllers';
import { setDefaultQueryParameters } from '../middlewares';

export const productsRoutes = Router();

productsRoutes
  .route('/')
  .get([setDefaultQueryParameters], ProductController.getProducts)
  .post(ProductController.createProduct);

productsRoutes
  .route('/:id')
  .get(ProductController.getProduct)
  .put(ProductController.updateProduct)
  .delete(ProductController.deleteProduct);
