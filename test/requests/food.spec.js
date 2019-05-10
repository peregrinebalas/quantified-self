// var shell = require('shelljs');
// var request = require('supertest');
// var app = require('../../app');
//
// describe('Foods Endpoints', () => {
//   shell.exec('npx sequelize db:drop');
//   shell.exec('npx sequelize db:create');
//   shell.exec('npx sequelize db:migrate');
//   shell.exec('npx sequelize db:seed:all');
//
//   it('POST request for new food', () => {
//
//     const body = {
//       food_name: "pizza",
//       calories: 200
//     }
//     return request(app)
//             .post("/api/v1/foods")
//             .send(body)
//             .then(response => {
//       expect(response.statusCode).toBe(201)
//     });
//   });
//
//   it('GET request for food index', () => {
//     return request(app)
//             .get("/api/v1/foods")
//             .then(response => {
//       expect(response.statusCode).toBe(200),
//       expect(response.body[0].calories).toBe(200)
//     });
//   });
//
//   it('PATCH request for food', () => {
//     const body = {
//       id: 1,
//       food_name: "Pizza",
//       calories: 400
//     }
//     return request(app)
//             .put(`/api/v1/foods/1`)
//             .send(body)
//             .then(response => {
//       expect(response.statusCode).toBe(200),
//       expect(response.body.calories).toBe(400)
//     });
//   });
//
//   it('GET request for food show', () => {
//     return request(app)
//             .get(`/api/v1/foods/1`)
//             .then(response => {
//       expect(response.statusCode).toBe(200),
//       expect(response.body.calories).toBe(400)
//     });
//   });
//
//   it('DELETE request for food', () => {
//     return request(app)
//             .delete(`/api/v1/foods/1`)
//             .then(response => {
//       expect(response.statusCode).toBe(200),
//       expect(response.body.message).toBe("Pizza has been deleted.")
//     });
//   });
// });
