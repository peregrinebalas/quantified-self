var shell = require('shelljs');
var request = require("supertest");
var bodyParser = require('body-parser');
var express = require('express');
var test = express()
var app = require('../../app.js');
var clear = require('../specHelper')

test.use(bodyParser.json())
test.use(bodyParser.urlencoded({ extended: true }))

describe('api', () => {
  beforeEach(() => {
    shell.exec('npx sequelize db:drop')
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate')
  });

  describe('Foods Endpoints', () => {
    it('POST request for new food', () => {
      const body = {
        food_name: "pizza",
        calories: 200
      }
      return request(app)
              .post("/api/v1/foods/")
              .send(body)
              .then(response => {
        expect(response.statusCode).toBe(201)
      });
    });
  });
});
