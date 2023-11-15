'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User);
      Cart.belongsTo(models.ProductVariant);
    }
  }
  Cart.init(
    {
      UserId: DataTypes.INTEGER,
      ProductVariantId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Cart',
      hooks: {
        beforeCreate: (cart, options) => {
          cart.quantity = 1;
          cart.status = 'unpaid';
        }
      }
    }
  );
  return Cart;
};
