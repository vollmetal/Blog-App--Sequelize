'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.addColumn('Posts', 'category', {
      type: Sequelize.STRING
     })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Posts', 'category')
  }
};
