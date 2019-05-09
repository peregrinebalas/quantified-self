const Food = require('../models').Food
const pry = require('pryjs')

const add = (req, res) => {
  let food = req.body.food_name
      food = food.toLowerCase()
      food = food[0].toUpperCase() + food.substring(1)
  Food.create({
    name: food,
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

const show = async (req, res) => {
  try {
    const food = await Food.findOne({
      where: {
        id: req.params.id
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

module.exports = {
  index, show, add, update, destroy
}
