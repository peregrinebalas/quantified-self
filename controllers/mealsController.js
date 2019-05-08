const Meal = require('../models').Meal
const User = require('../models').User
const pry = require('pryjs')

const create = (req, res) => {
  User.findOne({ where: { api_key: req.body.api_key } })
    .then(user => {
      let meal = req.body.meal_name
      meal = meal.toLowerCase()
      meal = meal[0].toUpperCase() + meal.substring(1)
      Meal.findOrCreate({ where: {
        meal_name: meal,
        date: req.body.date
      } })
      .then(meal => {
        res.setHeader("Content-Type", "application/json");
        res.status(201).send(JSON.stringify({"Message": `${meal[0].meal_name} has been added to meals for ${meal[0].date.toLocaleDateString('en-US')}`})) })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify("Well that didn't work.")) })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify("Invalid credentials")) })
    });
}

module.exports = {
  create
}
