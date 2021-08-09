var express = require('express');
var router = express.Router();

const authorController = require('../controllers/authorController');
const postController = require('../controllers/postController');

router.get('/', function(req, res, next) {
  res.json({
    message: "Welcome to my blog"
  })
});

router.get('/posts', postController.post_list);
router.post('/posts', postController.post_create);

router.get('/authors', authorController.author_list);
router.post('/authors', authorController.author_create);

router.get('/posts/:id/comments', postController.comment_list);

module.exports = router;
