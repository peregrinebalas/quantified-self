const Food = require('../models').Food
const hat = require('hat')
const pry = require('pryjs')

const add = (req, res) => {
  Food.create({
    name: req.body.name,
    calories: req.body.calories
  })
  .then(food => {
    res.setHeader("Content-Type", "application/json");
    res.status(201).send(JSON.stringify(food));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send({error});
  });
}

const index = (request, response) => {
}

module.exports = {
  index, add
}
