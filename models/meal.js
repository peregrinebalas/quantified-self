'use strict';

module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    meal_name: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  Meal.associate = function(models) {
    Meal.hasMany(models.MealFoods);
  };
  return Meal;
};
