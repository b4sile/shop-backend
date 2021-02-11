import { User } from './user';
import { Product } from './product';
import { Category } from './category';
import { ProductMeta } from './productMeta';
import { Cart } from './cart';
import { CartItem } from './cartItem';
import { Order } from './order';
import { OrderItem } from './orderItem';

Category.hasMany(Product, {
  onDelete: 'CASCADE',
  foreignKey: {
    allowNull: false,
  },
});

Product.hasMany(ProductMeta, {
  onDelete: 'CASCADE',
  foreignKey: {
    allowNull: false,
  },
});

User.hasOne(Cart, {
  onDelete: 'CASCADE',
  foreignKey: {
    allowNull: false,
  },
});

Cart.hasMany(CartItem, {
  onDelete: 'CASCADE',
  foreignKey: {
    allowNull: false,
  },
});

User.hasMany(Order);

Order.hasMany(OrderItem, {
  onDelete: 'CASCADE',
  foreignKey: {
    allowNull: false,
  },
});

ProductMeta.hasMany(CartItem, {
  onDelete: 'CASCADE',
  foreignKey: {
    allowNull: false,
  },
});

ProductMeta.hasMany(OrderItem);

export { Category };
export { User };
export { Product };
export { ProductMeta };
export { Cart };
export { CartItem };
export { Order };
export { OrderItem };
