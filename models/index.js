import { User } from './user';
import { Product } from './product';
import { Category } from './category';
import { ProductMeta } from './productMeta';
import { Cart } from './cart';
import { CartItem } from './cartItem';
import { Order } from './order';
import { OrderItem } from './orderItem';

Category.hasMany(Product, { onDelete: 'CASCADE' });

Product.hasMany(ProductMeta, { onDelete: 'CASCADE' });

User.hasOne(Cart, { onDelete: 'CASCADE' });

Cart.hasMany(CartItem, { onDelete: 'CASCADE' });

User.hasMany(Order);

Order.hasMany(OrderItem, { onDelete: 'CASCADE' });

ProductMeta.hasMany(CartItem, { onDelete: 'CASCADE' });

ProductMeta.hasMany(OrderItem);

export { Category };
export { User };
export { Product };
export { ProductMeta };
export { Cart };
export { CartItem };
export { Order };
export { OrderItem };
