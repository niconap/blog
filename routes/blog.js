var express = require('express');
var router = express.Router();

const authorController = require('../controllers/authorController');
const commentController = require('../controllers/commentController');
const postController = require('../controllers/postController');

router.get('/', function(req, res, next) {
  res.json({
    message: "Welcome to my blog"
  })
});

router.get('/posts', postController.post_list);

router.post('/posts', postController.post_create);

module.exports = router;
