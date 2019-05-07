'use strict';

module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    meal_name: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  Meal.associate = function(models) {
    // associations can be defined here
  };
  return Meal;
};
