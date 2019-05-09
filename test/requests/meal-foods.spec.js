var shell = require('shelljs');
var request = require("supertest");
var bodyParser = require('body-parser');
var express = require('express');
var test = express()
var app = require('../../app.js');
var clear = require('../specHelper')

test.use(bodyParser.json())
test.use(bodyParser.urlencoded({ extended: false }))

describe('api', () => {
  beforeEach(() => {
    shell.exec('npx sequelize db:drop')
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  });
  describe('MealFoods Endpoints', () => {
    it('POST request for new meal', () => {
      const body = {
        api_key: "1234",
        meal: "Breakfast",
        date: "1/5/19",
        food: "Chicken"
      }
      return request(app)
              .post("/api/v1/meal-foods")
              .send(body)
              .then(response => {
        expect(response).toBe(201)
      });
    });
  });
});
