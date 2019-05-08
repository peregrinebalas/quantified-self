'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint(
      'Food',
      ['name'],
      {
        type: 'unique',
        name: 'unique_name_constraint'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'Food',
      ['name'],
      {
        type: 'unique',
        name: 'unique_name_constraint'
      }
    );
  }
};
