import { Router } from 'express';
import { ProductController } from '../controllers';

export const productsRoutes = Router();

productsRoutes
  .route('/')
  .get(ProductController.getProducts)
  .post(ProductController.createProduct);

productsRoutes
  .route('/:id')
  .put(ProductController.updateProduct)
  .delete(ProductController.deleteProduct);
