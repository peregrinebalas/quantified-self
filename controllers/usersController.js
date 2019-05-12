const User = require('../models').User
const bcrypt = require('bcrypt');
const hat = require('hat')
const pry = require('pryjs')
const saltRounds = 10;

const register = (req, res) => {
  const email = req.query.email
  const password = req.query.password
  const confirmation = req.query.password_confirmation

  if (email && password && password === confirmation) {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      User.create({
        email: email,
        password: hash,
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
    })
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify("Invalid credentials."));
  };
}

const login = (req, res) => {
  User.findOne({ where: { email: req.query.email } })
  .then(user => {
    const password = req.query.password
    bcrypt.compare(password, user.password, function(err, match) {
      if (match) {
        res.setHeader("Content-Type", "application/json");
        res.status(201).send(JSON.stringify(user.api_key))
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(401).send(JSON.stringify("Invalid credentials."));
      };
    })
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify("Invalid credentials."));
  })
}

module.exports = {
  register, login
}
