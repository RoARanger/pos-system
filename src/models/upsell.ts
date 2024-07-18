import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Product from './product';

interface UpsellAttributes {
  id: number;
  productId: number;
  upsellProductId: number;
}

interface UpsellCreationAttributes extends Optional<UpsellAttributes, 'id'> {}

class Upsell extends Model<UpsellAttributes, UpsellCreationAttributes> implements UpsellAttributes {
  public id!: number;
  public productId!: number;
  public upsellProductId!: number;
}

Upsell.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    upsellProductId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'upsells',
  }
);

// Define associations
Upsell.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Upsell.belongsTo(Product, { foreignKey: 'upsellProductId', as: 'upsellProduct' });

export default Upsell;
