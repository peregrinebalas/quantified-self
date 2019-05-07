const User = require('../models').User
const hat = require('hat')
const pry = require('pryjs')

const register = (req, res) => {
  if (req.body.password === req.body.password_confirmation) {
    User.create({
      email: req.body.email,
      password: req.body.password,
      api_key: hat()
    })
    .then(user => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify({"api_key": `${user.api_key}`}));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send("User not created");
    });

  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify("This didn't work"));
  };
}

const index = (request, response) => {
}

module.exports = {
  index, register
}
