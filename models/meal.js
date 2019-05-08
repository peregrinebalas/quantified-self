'use strict';

module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    meal_name: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  Meal.associate = function(m) {
    Meal.belongsToMany(m.Food, {through: m.MealFood, foreignKey: m.MealId});
    Meal.belongsToMany(m.User, {through: m.MealFood, foreignKey: m.MealId});
  };
  return Meal;
};
