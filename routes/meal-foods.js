var express = require('express');
var router = express.Router();
var mealFoodsController = require('../controllers/mealFoodsController')

router.post('/', mealFoodsController.create);
router.delete('/:id', mealFoodsController.destroy);

module.exports = router;
