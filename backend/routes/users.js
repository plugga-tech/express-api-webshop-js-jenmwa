var express = require('express');
const router = express.Router();

const crypto = require("crypto-js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource from users GET');
});

router.post('/', function(request, response, next) {
  response.send('respond with a resource from users POST');
})

router.post('/add', function(request, response, next) {
  let newUser = { 
    name: request.body,
    email: request.body
  };
  let userPassword = crypto.SHA3(request.body.password).toString();

  response.send('respond with a resource from users/ADD POST');
})

router.post('/login', function(request, response, next) {
  response.send('respond with a resource from users/LOGIN POST');
})

module.exports = router;
