var express = require('express');
var router = express.Router();
var mealsController = require('../controllers/mealsController')

router.post('/', mealsController.create);

module.exports = router;
