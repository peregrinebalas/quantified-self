'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    api_key: DataTypes.STRING
  }, {});
  User.associate = function(m) {
    User.belongsToMany(m.Food, {through: m.MealFood, foreignKey: m.UserId});
    User.belongsToMany(m.Meal, {through: m.MealFood, foreignKey: m.UserId});
  };
  return User;
};
