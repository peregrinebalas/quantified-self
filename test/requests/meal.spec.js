var shell = require('shelljs');
var request = require("supertest");
var bodyParser = require('body-parser');
var express = require('express');
var test = express()
var app = require('../../app.js');
var clear = require('../specHelper')
const Meal = require('../../models').Meal
const User = require('../../models').User
const Food = require('../../models').Food
const MealFood = require('../../models').MealFood

test.use(bodyParser.json())
test.use(bodyParser.urlencoded({ extended: true }))

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:drop')
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  });

  describe('Meals Endpoints', () => {
    it('GET request for meal', () => {
      const body = {
        api_key: "1234"
      }
      return request(app)
              .post("/api/v1/meals/1")
              .send(body)
              .then(response => {
        expect(response.body).toBe(201)
      });
    });

    it('GET request for all meals/index', () => {
      const body = {
        api_key: "1234"
      }
      return request(app)
              .post("/api/v1/meals/")
              .send(body)
              .then(response => {
        expect(response.body).toBe(201)
        expect(response.body.meals.length).toBe(1)
        expect(response.body.meals[0].foods.length).toBe(3)
      });
    });

    it('POST request for new meal', () => {
      const body = {
        api_key: "klasjfd3oiu05704309284fyouysgy",
        meal: "Breakfast",
        date: "1/5/19"
      }
      return request(app)
      .post("/api/v1/meals/")
      .send(body)
      .then(response => {
        expect(response.statusCode).toBe(201)
        expect(response.body.id).toBe("3")
        expect(response.body.message).toBe("Breakfast has been added to meals for 1/5/19")
      });
    });
  });
});
