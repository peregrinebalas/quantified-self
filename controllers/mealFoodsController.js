const Meal = require('../models').Meal
const User = require('../models').User
const Food = require('../models').Food
const MealFood = require('../models').MealFood
const pry = require('pryjs');

const create = async (req, res) => {
  try {
    const user = await User.findOne({ where: { api_key: req.query.api_key } });
    const mealQuery = sanitizeEntry(req.query.meal_name);
    return findMeal(user, mealQuery, req, res);
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({error: "Invalid credentials."}));
  }
}

const destroy = async (req, res) => {
  try {
    const remove = await MealFood.destroy({ where: { UserId: req.query.userID, MealId: req.query.mealID, FoodId: req.query.foodID} });
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify("Record has been deleted."));
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({error: "Record could not be deleted."}));
  }
}

const findMeal = async (user, mealQuery, req, res) => {
  try {
    const foodQuery = sanitizeEntry(req.query.food_name);
    const date = new Date(req.query.date)
    const meal = await Meal.findOrCreate({ where:
      {
        meal_name: mealQuery,
        date: date
      }
    });
    const results = await findFood(user, meal, foodQuery, res)
    // eval(pry.it)
    return results;
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({error: "Meal not found."}))
  }
}

const findFood = async (user, meal, foodQuery, res) => {
  try {
    food = await Food.findOne({ where: { name: foodQuery } });
    if (food) {
      return createMealFood(user, meal, food, res)
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(404).send(JSON.stringify({error: "Food not in database."}))
    }
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
