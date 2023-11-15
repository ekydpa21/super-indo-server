'use strict';
const { Model } = require('sequelize');
const { hasher } = require('../helpers/hash');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.ProductVariant);
      User.belongsToMany(models.ProductVariant, {
        through: models.Cart,
        foreignKey: 'UserId'
      });
      User.hasMany(models.Cart);
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: `Name is required`
          }
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Username is required`
          }
        },
        unique: {
          args: true,
          msg: `Username has been registered`
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Password is required`
          },
          notNull: {
            msg: `Password is required`
          },
          len: {
            args: [6],
            msg: 'Password at least 6 characters'
          }
        }
      },
      role: {
        type: DataTypes.STRING,
        isIn: { args: [['administrator', 'customer']], msg: 'No such role is available' }
      }
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (user, options) => {
          user.password = hasher(user.password);
        }
      }
    }
  );
  return User;
};
