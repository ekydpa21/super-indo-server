'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductVariant.belongsTo(models.Product, { foreignKey: 'product_id' });

      ProductVariant.belongsToMany(models.User, {
        through: models.Cart,
        foreignKey: 'ProductVariantId'
      });
      ProductVariant.hasMany(models.Cart);

      ProductVariant.belongsToMany(models.Transaction, {
        through: models.TransactionDetail,
        foreignKey: 'ProductVariantId'
      });
      ProductVariant.hasMany(models.TransactionDetail);
    }
  }
  ProductVariant.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Product Id is required`
          },
          notNull: {
            msg: `Product Id is required`
          }
        }
      },
      code: DataTypes.STRING,
      name: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: `Product Variant has been registered`
        }
      },
      qty: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      active: { type: DataTypes.BOOLEAN },
      image_url: DataTypes.STRING,
      created_user: DataTypes.STRING,
      updated_user: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'ProductVariant'
    }
  );
  return ProductVariant;
};
