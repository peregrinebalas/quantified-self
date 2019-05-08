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
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
});

describe('Users Endpoints', () => {
  test('POST request for new meal', () => {
    const body = {
                    api_key: "klasjfd3oiu05704309284fyouysgy",
                    meal_name: "Breakfast",
                    date: "1/5/19"
                  }
    return request(app)
    .post("/api/v1/meals")
    .send(body)
    .then(response => {
      expect(response.statusCode).toBe(201)
      expect(typeof response.body.api_key).toBe("string")
    });
  });
});
