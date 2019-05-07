var express = require('express');
var router = express.Router();
var usersController = require('../controllers/usersController')

router.post('/register', usersController.register);
router.post('/', usersController.login);

module.exports = router;
