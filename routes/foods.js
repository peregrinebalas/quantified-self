var express = require('express');
var router = express.Router();
var foodsController = require('../controllers/foodsController')

router.post('/', foodsController.add);
router.get('/all', foodsController.index);
router.get('/', foodsController.show);
router.put('/:id', foodsController.update);
router.delete('/:id', foodsController.destroy);

module.exports = router;
