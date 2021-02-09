import { Router } from 'express';
import { CategoryController } from '../controllers';

export const categoriesRoutes = Router();

categoriesRoutes
  .route('/')
  .get(CategoryController.getCategories)
  .post(CategoryController.createCategory);

categoriesRoutes
  .route('/:id')
  .put(CategoryController.updateCategory)
  .delete(CategoryController.deleteCategory);
