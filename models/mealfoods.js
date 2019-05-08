'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealFoods = sequelize.define('MealFoods', {
    UserId: DataTypes.INTEGER,
    MealId: DataTypes.INTEGER,
    FoodId: DataTypes.INTEGER
  }, {});
  MealFoods.associate = function(models) {
    MealFoods.belongsTo(models.User);
    MealFoods.belongsTo(models.Meal);
    MealFoods.belongsTo(models.Food)
  };
  return MealFoods;
};
