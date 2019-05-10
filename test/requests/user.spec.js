// var shell = require('shelljs');
// var request = require("supertest");
// var bodyParser = require('body-parser');
// var express = require('express');
// var test = express()
// var app = require('../../app.js');
// var clear = require('../specHelper')
//
// test.use(bodyParser.json())
// test.use(bodyParser.urlencoded({ extended: true }))
//
// describe('api', () => {
//   beforeAll(() => {
//     shell.exec('npx sequelize db:drop')
//     shell.exec('npx sequelize db:create')
//     shell.exec('npx sequelize db:migrate')
//   });
//
//   describe('Users Endpoints', () => {
//     it('POST request for new user', () => {
//       const body = {
//         email: "user@email.com",
//         password: "test",
//         password_confirmation: "test"
//       }
//       return request(app)
//               .post("/api/v1/users/register")
//               .send(body)
//               .then(response => {
//         expect(response.statusCode).toBe(201),
//         expect(typeof response.body.api_key).toBe("string")
//       });
//     });
//
//     it('POST request for user login', () => {
//       const body = {
//         email: "user@email.com",
//         password: "test",
//       }
//       return request(app)
//               .post("/api/v1/users")
//               .send(body)
//               .then(response => {
//         expect(response.statusCode).toBe(201),
//         expect(typeof response.body.api_key).toBe("string")
//       });
//     });
//   });
// });
