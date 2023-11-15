'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.ProductCategory, { foreignKey: 'product_category_id' });
      Product.hasMany(models.ProductVariant, { foreignKey: 'product_id' });
    }
  }
  Product.init(
    {
      product_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Product Category Id is required`
          },
          notNull: {
            msg: `Product Category Id is required`
          }
        }
      },
      plu: DataTypes.STRING,
      name: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: `Product has been registered`
        }
      },
      active: { type: DataTypes.BOOLEAN },
      created_user: DataTypes.STRING,
      updated_user: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Product'
    }
  );
  return Product;
};
