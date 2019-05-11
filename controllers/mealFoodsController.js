const Meal = require('../models').Meal
const User = require('../models').User
const Food = require('../models').Food
const MealFood = require('../models').MealFood
const pry = require('pryjs');

const create = async (req, res) => {
  try {
    const user = await User.findOne({ where: { api_key: req.body.api_key } });
    const meal = sanitizeEntry(req.body.meal_name);
    return findMeal(user, meal, req, res);
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({error: "Invalid credentials."}));
  }
}

const destroy = async (req, res) => {
  try {
    const user = await User.findOne({ where: { api_key: req.body.api_key } });
    const remove = await MealFood.destroy({ where: { id: req.params.id } });
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify("Record has been deleted."));
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({error: "Record could not be deleted."}));
  }
}

const findMeal = async (user, meal, req, res) => {
  try {
    const food = sanitizeEntry(req.body.food_name);
    meal = await Meal.findOrCreate({ where:
      {
        meal_name: meal,
        date: req.body.date
      }
    });
    const results = findFood(user, meal, food, res)
    return results;
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({error: "Meal not found."}))
  }
}

const findFood = async (user, meal, food, res) => {
  try {
    food = await Food.findOne({ where: {
      name: food
    }});
    return createMealFood(user, meal, food, res);
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({error: "Food not found."}))
  }
}

const createMealFood = async (user, meal, food, res) => {
  try {
    mealFood = await MealFood.create({
      MealId: meal[0].id,
      FoodId: food.id,
      UserId: user.id
    });
    res.setHeader("Content-Type", "application/json");
    res.status(201).send(JSON.stringify({message: `${food.name} has been added to ${meal[0].meal_name} for ${meal[0].date.toLocaleDateString('en-US')}`}));
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({error: "Could not complete request."}))
  }
}

const sanitizeEntry = (userEntry) => {
  let entry = userEntry;
  entry = entry.toLowerCase();
  entry = entry[0].toUpperCase() + entry.substring(1);
  return entry;
}

module.exports = {
  create, destroy
}
