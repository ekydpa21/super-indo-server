'use strict';

const { hasher } = require('../helpers/hash');

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
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Operator 1',
        username: 'operator1',
        password: hasher('123123'),
        role: 'administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Customer 1',
        username: 'customer1',
        password: hasher('123123'),
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Operator 2',
        username: 'operatorr2',
        password: hasher('123123'),
        role: 'administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Customer 2',
        username: 'customer2',
        password: hasher('123123'),
        role: 'customer',
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
    await queryInterface.bulkDelete('Users', null, {});
  }
};
