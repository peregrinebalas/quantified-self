var express = require('express');
var router = express.Router();
var foodsController = require('../controllers/foodsController')
var pry = 'pryjs'

router.post('/', foodsController.add);
router.get('/', foodsController.index);

module.exports = router;
