import { Router } from 'express';
import { ProductMetaController } from '../controllers';
import { setDefaultQueryParameters } from '../middlewares';

export const productsMetaRoutes = Router();

productsMetaRoutes
  .route('/')
  .get([setDefaultQueryParameters], ProductMetaController.getProductsMeta)
  .post(ProductMetaController.createProductMeta);

productsMetaRoutes
  .route('/:id')
  .get(ProductMetaController.getProductMeta)
  .put(ProductMetaController.updateProductMeta)
  .delete(ProductMetaController.deleteProductMeta);
