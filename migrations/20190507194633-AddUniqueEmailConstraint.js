'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint(
      'Users',
      ['email'],
      {
        type: 'unique',
        name: 'unique_email_constraint'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'Users',
      ['email'],
      {
        type: 'unique',
        name: 'unique_email_constraint'
      }
    );
  }
};
