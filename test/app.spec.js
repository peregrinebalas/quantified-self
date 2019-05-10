var shell = require('shelljs');
var request = require("supertest");
var bodyParser = require('body-parser');
var express = require('express');
var test = express()
var app = require('../app.js');
// var clear = require('../specHelper')
const Meal = require('../models').Meal
const User = require('../models').User
const Food = require('../models').Food
const MealFood = require('../models').MealFood

test.use(bodyParser.json())
test.use(bodyParser.urlencoded({ extended: true }))

describe('api spec', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:drop')
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate')
  });

  describe('api', () => {
    describe('Users Endpoints', () => {
      it('POST request for new user', () => {
        const body = {
          email: "user@email.com",
          password: "test",
          password_confirmation: "test"
        }
        return request(app)
                .post("/api/v1/users/register")
                .send(body)
                .then(response => {
          expect(response.statusCode).toBe(201),
          expect(typeof response.body.api_key).toBe("string")
        });
      });

      it('POST request for user login', () => {
        const body = {
          email: "user@email.com",
          password: "test",
        }
        return request(app)
                .post("/api/v1/users")
                .send(body)
                .then(response => {
          expect(response.statusCode).toBe(201),
          expect(typeof response.body.api_key).toBe("string")
        });
      });
    });
  });

  describe('api', () => {
    // beforeAll(() => {
    //   shell.exec('npx sequelize db:drop')
    //   shell.exec('npx sequelize db:create')
    //   shell.exec('npx sequelize db:migrate')
    // });

    describe('Foods Endpoints', () => {
      it('POST request for new food', () => {
        const body = {
          food_name: "pizza",
          calories: 200
        }
        return request(app)
                .post("/api/v1/foods")
                .send(body)
                .then(response => {
          expect(response.statusCode).toBe(201)
        });
      });

      it('GET request for food index', () => {
        return request(app)
                .get("/api/v1/foods")
                .then(response => {
          expect(response.statusCode).toBe(200),
          expect(response.body[0].calories).toBe(200)
        });
      });

      it('GET request for food show', () => {
        return request(app)
                .get("/api/v1/foods/1")
                .then(response => {
          expect(response.statusCode).toBe(200),
          expect(response.body.calories).toBe(200)
        });
      });

      it('PATCH request for food', () => {
        const body = {
          id: 1,
          food_name: "pizza",
          calories: 400
        }
        return request(app)
                .put("/api/v1/foods/1")
                .send(body)
                .then(response => {
          expect(response.statusCode).toBe(200),
          expect(response.body.calories).toBe(400)
        });
      });
    });
  });

  describe('api', () => {
    // beforeEach(() => {
    //   shell.exec('npx sequelize db:drop')
    //   shell.exec('npx sequelize db:create')
    //   shell.exec('npx sequelize db:migrate')
    //   shell.exec('npx sequelize db:seed:all')
    // });
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

  describe('api', () => {
    // beforeAll(() => {
    //   shell.exec('npx sequelize db:drop')
    //   shell.exec('npx sequelize db:create')
    //   shell.exec('npx sequelize db:migrate')
    //   shell.exec('npx sequelize db:seed:all')
    // });

    describe('Meals Endpoints', () => {
      it('GET request for meal', () => {
        const body = {
          api_key: "1234"
        }
        return request(app)
                .get("/api/v1/meals/2")
                .send(body)
                .then(response => {
          expect(response).toBe(201)
        });
      });

      it('GET request for all meals/index', () => {
        const body = {
          api_key: "1234"
        }
        return request(app)
                .get("/api/v1/meals/")
                .send(body)
                .then(response => {
          expect(response).toBe(201)
          expect(response.body.meals.length).toBe(1)
          expect(response.body.meals[0].foods.length).toBe(3)
        });
      });

      it('POST request for new meal', () => {
        const body = {
          api_key: "1234",
          meal: "Breakfast",
          date: "1/5/19"
        }
        return request(app)
                .post("/api/v1/meals/")
                .send(body)
                .then(response => {
          expect(response.statusCode).toBe(201),
          expect(response.body.message).toBe("Breakfast has been added to meals for 1/5/2019")
        });
      });
    });
  });
});
