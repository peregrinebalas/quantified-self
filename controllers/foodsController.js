const fetch = require('node-fetch')
const Food = require('../models').Food
const pry = require('pryjs')

const add = async (req, res) => {
  try {
    let food = sanitizeEntry(req.query.food_name)
    food = await Food.create({
      name: food,
      calories: req.query.calories
    });
    const key = process.env.RECIPE_KEY

    const response = await fetch(`https://choosin-foods-recipes.herokuapp.com/api/v1/recipes?ingredient=${food.name}&key=${key}`, {method: 'POST'});

    res.setHeader("Content-Type", "application/json");
    res.status(201).send(JSON.stringify(food));
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send({error});
  }
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

const show = async (req, res) => {
  try {
    const food = await Food.findOne({
      where: {
        name: sanitizeEntry(req.query.food_name)
      }
    });
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(food));
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send({error});
  }
}

const update = async (req, res) => {
  try {
    let food = await Food.findOne({where: {id: req.params.id}})
    food.name = req.body.food_name
    food.calories = req.body.calories
    food.save({fields: ['name', 'calories']})
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(food));
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send({error});
  }
}

const destroy = async (req, res) => {
  try {
    let food = await Food.findOne({where: {id: req.params.id}});
    await food.destroy();
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({message: `${food.name} has been deleted.`}));
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send({error});
  }
}

const sanitizeEntry = (userEntry) => {
  let entry = userEntry
  entry = entry.toLowerCase()
  entry = entry[0].toUpperCase() + entry.substring(1)
  return entry
}

module.exports = {
  show, add, update, destroy, index
}
