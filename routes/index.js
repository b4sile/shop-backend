import { Router } from 'express';
import { usersRoutes } from './users.routes';
import { categoriesRoutes } from './categories.routes';
import { productsRoutes } from './products.routes';
import { cartsRoutes } from './carts.routes';

export const router = Router();

router.use('/users', usersRoutes);
router.use('/categories', categoriesRoutes);
router.use('/products', productsRoutes);
router.use('/carts', cartsRoutes);
