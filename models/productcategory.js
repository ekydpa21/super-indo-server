'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductCategory.hasMany(models.Product, { foreignKey: 'product_category_id' });
    }
  }
  ProductCategory.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: `Product Category has been registered`
        }
      },
      active: { type: DataTypes.BOOLEAN },
      created_user: DataTypes.STRING,
      updated_user: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'ProductCategory'
    }
  );
  return ProductCategory;
};
