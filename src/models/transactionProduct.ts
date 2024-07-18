import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Transaction from './transaction';
import Product from './product';

interface TransactionProductAttributes {
  id: number;
  transactionId: number;
  productId: number;
  quantity: number;
}

interface TransactionProductCreationAttributes extends Optional<TransactionProductAttributes, 'id'> {}

class TransactionProduct extends Model<TransactionProductAttributes, TransactionProductCreationAttributes> implements TransactionProductAttributes {
  public id!: number;
  public transactionId!: number;
  public productId!: number;
  public quantity!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TransactionProduct.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    transactionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'transaction_products',
  }
);

TransactionProduct.belongsTo(Transaction, { foreignKey: 'transactionId' });
TransactionProduct.belongsTo(Product, { foreignKey: 'productId' });

Transaction.hasMany(TransactionProduct, { foreignKey: 'transactionId' });
Product.hasMany(TransactionProduct, { foreignKey: 'productId' });

export default TransactionProduct;
