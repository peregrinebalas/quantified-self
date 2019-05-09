const Meal = require('../models').Meal
const User = require('../models').User
const Food = require('../models').Food
const MealFood = require('../models').MealFood
const pry = require('pryjs')

const create = (req, res) => {
  User.findOne({ where: { api_key: req.body.api_key } })
    .then(user => {
      const meal = sanitizeEntry(req.body.meal_name)
      return findMeal(user, meal, req, res)
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify("Invalid credentials."))
    })
}

const findMeal = (user, meal, req, res) => {
  Meal.findOrCreate({ where:
    {
    meal_name: meal,
    date: req.body.date
    }
  })
  .then(meal => {
    const food = sanitizeEntry(req.body.food_name)
    return findFood(user, meal, food, res)
  })
  .catch(error => {
    console.log(`meal: ${meal}, user: ${user}, food: ${food}`)
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify("Meal not found."))
  })
}

const findFood = (user, meal, food, res) => {
  Food.findOne({ where: {
    name: food
  }})
  .then(food => {
    return createMealFood(user, meal, food, res)
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify("Food not found."))
  })
}

const createMealFood = (user, meal, food, res) => {
  MealFood.create({
    MealId: meal[0].id,
    FoodId: food.id,
    UserId: user.id
  })
  .then(mealFood => {
    res.setHeader("Content-Type", "application/json");
    res.status(201).send(JSON.stringify({"Message": `${food.name} has been added to ${meal[0].meal_name} for ${meal[0].date.toLocaleDateString('en-US')}`}))
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify("Could not complete request."))
  })
}

const sanitizeEntry = (userEntry) => {
  let entry = userEntry
  entry = entry.toLowerCase()
  entry = entry[0].toUpperCase() + entry.substring(1)
  return entry
}

const destroy = async (req, res) => {
  try {
    const user = await User.findOne({ where: { api_key: req.body.api_key } })
    const remove = await MealFood.destroy({ where: { id: req.params.id } })
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify("Record has been deleted."))
  } catch (error) {
      res.setHeader("Content-Type", "application/json");
      res.status(404).send(JSON.stringify("Record could not be deleted."))
  }
}

module.exports = {
  create,destroy
}
