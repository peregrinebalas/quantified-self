const MealFood = require('../models').MealFood

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  }, {});
  Food.associate = function(m) {
    Food.belongsToMany(m.User, {through: m.MealFood, foreignKey: m.FoodId});
    Food.belongsToMany(m.Meal, {through: m.MealFood, foreignKey: m.FoodId});
  };
  return Food;
};
