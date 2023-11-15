'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Menus', [
      {
        name: 'Home',
        url: '/',
        allowed_role: ['administrator'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Categories',
        url: '/categories',
        allowed_role: ['administrator'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Products',
        url: '/products',
        allowed_role: ['administrator'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Transactions',
        url: '/transactions',
        allowed_role: ['administrator', 'customer'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Menus', null, {});
  }
};
