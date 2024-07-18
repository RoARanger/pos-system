import sequelize from '../config/database';
import User from './user';
import Product from './product';
import Upsell from './upsell';
import Transaction from './transaction';
import TransactionProduct from './transactionProduct';

// Define associations here
Transaction.hasMany(TransactionProduct, { foreignKey: 'transactionId' });
TransactionProduct.belongsTo(Transaction, { foreignKey: 'transactionId' });

Product.hasMany(TransactionProduct, { foreignKey: 'productId' });
TransactionProduct.belongsTo(Product, { foreignKey: 'productId' });

sequelize.sync();

export { User, Product, Upsell, Transaction, TransactionProduct };
