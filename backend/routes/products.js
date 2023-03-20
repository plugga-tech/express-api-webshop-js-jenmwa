var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource from products');
});

router.get('/:id', function(request, response, next) {
  response.send('respond with a resource from products/:id')
  //dynamic
})

router.post('/add', function(request, response, next) {
  response.send('respond with a resource from products/add')
})

module.exports = router;
