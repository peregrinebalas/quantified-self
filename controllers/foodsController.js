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

const index = async (req, res) => {
  try {
    const foods = await Food.findAll();
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(foods));
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send({error});
  }
}

module.exports = {
  index, add
}
