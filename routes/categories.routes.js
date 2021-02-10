import { Router } from 'express';
import { CategoryController } from '../controllers';
import { setDefaultQueryParameters } from '../middlewares';

export const categoriesRoutes = Router();

categoriesRoutes
  .route('/')
  .get([setDefaultQueryParameters], CategoryController.getCategories)
  .post(CategoryController.createCategory);

categoriesRoutes
  .route('/:id')
  .get(CategoryController.getCategory)
  .put(CategoryController.updateCategory)
  .delete(CategoryController.deleteCategory);
