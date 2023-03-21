var express = require('express');
const productsModels = require('../models/products-models');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const products = await productsModels.find();
  
  res.send('respond with a resource from orders');
});

router.post('/add', function(req, res, next) {
  res.send('respond with a resource from orders /ADD');
});

router.get('/all', function(req, res, next) {
  res.send('respond with a resource from orders /ALL');
});

module.exports = router;
