var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    message: "Welcome to my blog"
  })
});

module.exports = router;
