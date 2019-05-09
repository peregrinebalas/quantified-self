'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return Promise.all ([
      queryInterface.bulkInsert('Foods', [
        {
          id: 1,
          name: 'Apple',
          calories: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: 'Ice Cream Cone',
          calories: 450,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: 'Turkey Sandwich',
          calories: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]),
      queryInterface.bulkInsert('Meals', [
        {
          id: 1,
          meal_name: 'Breakfast',
          date: 5/8/19,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          meal_name: 'Lunch',
          date: 5/8/19,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]),
      queryInterface.bulkInsert('Users', [{
        id: 1,
        email: 'user1@email.com',
        api_key: '1234',
        password: 'test',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        email: 'user2@email.com',
        api_key: '5678',
        password: 'test',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]),
   queryInterface.bulkInsert('MealFoods', [
     {
       id: 1,
       FoodId: 1,
       MealId: 2,
       UserId: 1,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       id: 2,
       FoodId: 2,
       MealId: 2,
       UserId: 1,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       id: 3,
       FoodId: 3,
       MealId: 2,
       UserId: 1,
       createdAt: new Date(),
       updatedAt: new Date()
     }
   ])

  ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('Foods', null, {}),
      queryInterface.bulkDelete('Meals', null, {})
      queryInterface.bulkDelete('Users', null, {})
      queryInterface.bulkDelete('MealFoods', null, {})
    ]);
  }
};
