const Meal = require('../models').Meal
const User = require('../models').User
const Food = require('../models').Food
const MealFood = require('../models').MealFood
const pry = require('pryjs');

const create = (req, res) => {
  findUser(req.query.api_key)
    .then(user => {
      const meal = sanitizeEntry(req.query.meal_name);
      return createMeal(meal, req.query.date, res);
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(JSON.stringify({error: "Invalid credentials"}))
    });
}

const index = async (req, res) => {
  try {
    const user = await findUser(req.query.api_key);
    const meals = await findUserMeals(user.id);
    const mealsResults = await findAllMealFoods(meals, user.id)
    res.setHeader("Content-Type", "application/json");
    res.status(201).send(JSON.stringify({
      user_id: `${user.id}`,
      meals: mealsByDate(mealsResults)
    }));
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({error: "Could not fetch meals."}))
  }
}

const show = async (req, res) => {
  try {
    const user = await findUser(req.query.api_key);
    const meal = await findMeal(req.params.id);
    const mealFood = await findMealFood(req.params.id, user.id);
    const foods = await findFoods(mealFood);
    res.setHeader("Content-Type", "application/json");
    res.status(201).send(JSON.stringify({
      id: `${req.params.id}`,
      name: `${meal.meal_name}`,
      foods: foods
    }));
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({error: "Could not find meal."}));
  }
}

const createMeal = (meal, date, res) => {
  Meal.findOrCreate({ where: {
    meal_name: meal,
    date: date
  } })
  .then(meal => {
    res.setHeader("Content-Type", "application/json");
    res.status(201).send(JSON.stringify({
      id: `${meal[0].id}`,
      message: `${meal[0].meal_name} has been added to meals for ${meal[0].date.toLocaleDateString('en-US')}`
    }));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({error: "Could not store meal."}));
  });
}

const sanitizeEntry = (userEntry) => {
  let entry = userEntry;
  entry = entry.toLowerCase();
  entry = entry[0].toUpperCase() + entry.substring(1);
  return entry;
}

const findUserMeals = async (userId) => {
  const mealFoods = await MealFood.findAll({ where: { UserId: userId }});
  const meals = mealFoods.map( async mealFood => {
    const mealId = mealFood.MealId;
    const meal = Meal.findOne({ where: { id: mealId }});
    return meal;
  })
  const results = await Promise.all(meals);
  const filteredResults = removeDuplicates(results);
  return filteredResults;
}

function removeDuplicates(meals) {
  const result = [];
  const map = new Map();
  for (const item of meals) {
    if(!map.has(item.id)){
        map.set(item.id, true);
        result.push({
            id: item.id,
            name: item.meal_name,
            date: item.date
        });
    }
  }
  return result
}

const mealsByDate = (allMeals) => {
  const dateMeals = {};
  dateMeals.dates = [];
  let allDates = [];
  allMeals.map( async meal => {
    if (!allDates.includes(String(meal.date))) {
      let mealDate = {};
      mealDate[meal.date] = [];
      dateMeals.dates.push(mealDate);
      dateMeals.dates[dateMeals.dates.length - 1][meal.date].push(meal);
    } else {
      for (let i = 0; i < dateMeals.dates.length; i++) {
        if (Object.keys(dateMeals.dates[i])[0] === String(meal.date)) {
          dateMeals.dates[i][[Object.keys(dateMeals.dates[i])[0]][0]].push(meal);
        }
      }
    }
    dateMeals.dates.map( async date => {
      allDates.push(Object.keys(date))
    });
    allDates = allDates.flat();
  });
  return dateMeals;
  console.log(dateMeals);
}

const findAllMealFoods = (meals, userId) => {
  const allMealFoods = meals.map( async meal => {
    return mealFoodsObject(meal, userId);
  })
  return Promise.all(allMealFoods);
}

const mealFoodsObject = async (meal, userId) => {
  const mealFoods = await findMealFood(meal.id, userId);
  const foods = await findFoods(mealFoods);
  const newMeal = meal;
  newMeal.foods = foods;
  return newMeal;
}

const findUser = async (api_key) => {
  const user = await User.findOne({ where: { api_key: api_key} });
  return user;
}

const findMeal = async (mealId) => {
  const meal = await Meal.findOne({ where: { id: mealId } });
  return meal;
}

const findMealFood = async (mealId, userId) => {
  const mealFood = await MealFood.findAll({where: { MealId: mealId, UserId: userId } });
  return mealFood;
}

const findFoods = async (mealFoods) => {
  const foods = mealFoods.map( async mealFood => {
    const foodId = mealFood.FoodId;
    const food = await Food.findOne({where: {id: foodId}});
    return food;
  })
  var results = await Promise.all(foods);
  return results;
}

module.exports = {
  create, show, index
}
