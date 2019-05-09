'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealFood = sequelize.define('MealFood', {
    UserId: DataTypes.INTEGER,
    MealId: DataTypes.INTEGER,
    FoodId: DataTypes.INTEGER
  }, {
    // instanceMethods: {
    //   food: function() {
    //     MealFood.associations.Food.findAll()
      // }
    // }
  });
  MealFood.associate = function(m) {
    MealFood.belongsTo(m.User)
    MealFood.belongsTo(m.Food)
    MealFood.belongsTo(m.Meal)
  };
  return MealFood;
};
