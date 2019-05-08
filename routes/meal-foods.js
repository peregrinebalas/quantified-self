var express = require('express');
var router = express.Router();
var mealFoodsController = require('../controllers/mealFoodsController')

router.post('/', mealFoodsController.create);

module.exports = router;
