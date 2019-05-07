var shell = require('shelljs');
var request = require("supertest");

const clearTests = () => {
  shell.exec('npx sequelize db:migrate:undo:all')
  shell.exec('npx sequelize db:migrate')
  shell.exec('npx sequelize db:seed:all')
}

module.exports = {
  clearTests
}
