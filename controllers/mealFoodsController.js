const Meal = require('../models').Meal
const User = require('../models').User
const Food = require('../models').Food
const pry = require('pryjs')

const create = (req, res) => {
  User.findOne({ where: { api_key: req.body.api_key } })
    .then(user => {
      let meal = req.body.meal
      meal = meal.toLowerCase()
      meal = meal[0].toUpperCase() + meal.substring(1)
      Meal.findOrCreate({ where: {
        meal_name: meal,
        date: req.body.date
      } })
      .then(meal => {
        let food = req.body.food
        food = food.toLowerCase()
        food = food[0].toUpperCase() + food.substring(1)
        Food.findOrCreatet({ where: {
          name: food
        }})
        .then(food => {
          MealFood.create({
            MealId: meal.id,
            FoodId: food.id,
            UserId: user.id
          })
          .then(mealFood => {
            res.setHeader("Content-Type", "application/json");
            res.status(201).send(JSON.stringify({"Message": `${food} has been added to ${meal} for ${meal.date.toLocaleDateString('en-US')}`}))
          })
          .catch(error => {
            res.setHeader("Content-Type", "application/json");
            res.status(400).send(JSON.stringify("Could not complete request."))
          })
        })
        .catch(error => {
          res.setHeader("Content-Type", "application/json");
          res.status(404).send(JSON.stringify("Food could not be logged at this time."))
        })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify("Food not found."))
      })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(404).send(JSON.stringify("Meal not found."))
    })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify("Invalid credentials")) })
  });
}

module.exports = {
  create
}
