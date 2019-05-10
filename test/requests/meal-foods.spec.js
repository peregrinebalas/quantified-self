// var shell = require('shelljs');
// var request = require('supertest');
// var app = require('../../app');
//
//
// describe('MealFoods Endpoints', () => {
//   beforeAll(() => {
//     shell.exec('npx sequelize db:drop');
//     shell.exec('npx sequelize db:create');
//     shell.exec('npx sequelize db:migrate');
//     shell.exec('npx sequelize db:seed:all')
//   });
//
//   it('POST request for new meal', () => {
//     const body = {
//       api_key: "1234",
//       meal_name: "Breakfast",
//       date: "1/5/19",
//       food_name: "Popcorn"
//     }
//     return request(app)
//             .post("/api/v1/meal-foods")
//             .send(body)
//             .then(response => {
//       expect(response.statusCode).toBe(201)
//     });
//   });
// });
