'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {
      Promise.all([
        queryInterface.bulkInsert('Users', [
          {
            email: 'user8@email.com',
            password: 'test',
            api_key: '1234',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ], {}),
        queryInterface.bulkInsert('Food', [
          {
            name: 'Popcorn',
            calories: 105,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Egg',
            calories: 75,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Cupcake',
            calories: 450,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ], {}),
        queryInterface.bulkInsert('Meals', [
          {
            id: 1,
            meal_name: 'Breakfast',
            date: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 2,
            meal_name: 'Lunch',
            date: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 3,
            meal_name: 'Dinner',
            date: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ], {})
      ])
      .then(() => {
        resolve(queryInterface.bulkInsert('MealFoods', [
          {
            "FoodId": 1,
            "MealId": 1,
            "UserId": 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            "FoodId": 2,
            "MealId": 1,
            "UserId": 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            "FoodId": 2,
            "MealId": 2,
            "UserId": 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            "FoodId": 3,
            "MealId": 2,
            "UserId": 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            "FoodId": 1,
            "MealId": 3,
            "UserId": 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            "FoodId": 3,
            "MealId": 3,
            "UserId": 1,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ], {}))
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('MealFoods', null, {}),
      queryInterface.bulkDelete('Food', null, {}),
      queryInterface.bulkDelete('Meals', null, {})
      queryInterface.bulkDelete('Users', null, {})
    ])
  }
};
