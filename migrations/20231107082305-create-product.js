'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'ProductCategories'
          },
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      plu: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      created_user: {
        type: Sequelize.STRING
      },
      updated_user: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};
