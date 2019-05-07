var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController')
var pry = 'pryjs'

router.post('/register', usersController.register);
router.get('/', usersController.index);

module.exports = router;
