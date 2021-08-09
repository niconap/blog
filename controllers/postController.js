const Post = require('../models/post');
const Comment = require('../models/comment');
const Author = require('../models/author');
const async = require('async');
const { body, validationResult } = require('express-validator');

exports.post_list = function(req, res, next) {
  async.parallel({
    posts: function(callback) {
      Post.find({}).populate('author').populate('comments').exec(callback);
    }
  }, function(err, results) {
    if (err) return next(err);
    if (results.posts == null) {
      var err = new Error("No posts found");
      err.status = 404;
      return next(err);
    }
    res.json(results.posts);
  })
}

exports.post_create = [
  (req, res, next) => {
    next();
  },

  body('title', 'Title must be longer than 3 characters.').trim().isLength({ min: 3 }).escape(),
  body('title', 'Title must be shorter than 100 characters.').trim().isLength({ max: 100 }).escape(),
  body('content', 'Content must be longer than 3 characters.').trim().isLength({ min: 3 }).escape(),
  body('public', 'Public must be a boolean.').trim().isBoolean(),

  (req, res, next) => {
    const errors = validationResult(req);

    var post = new Post({
      title: req.body.title,
      content: req.body.content,
      comments: [],
      timestamp: new Date(),
      public: req.body.public,
    })

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
      })
      return;
    } else {
      post.save(function(err) {
        if (err) return next(err);
        res.json({
          message: 'Post succesfully added!',
          post
        })
      })
    }
  }
]

exports.comment_list = function(req, res, next) {
  async.parallel({
    post: function(callback) {
      Post.findOne({ _id: req.params.id }).populate(['comments']).exec(callback);
    }
  },
  function(err, results) {
    if (err) return next(err);
    if (results.post == null) {
      var err = new Error("Post not found");
      err.status = 404;
      return next(err);
    } else if (results.post.comments.length == 0) {
      var err = new Error("No comments found under this post");
      err.status = 404;
      return next(err);
    }
    res.json(results.post.comments);
  })
}

exports.comment_create = [
  exports.post_create = [
    (req, res, next) => {
      next();
    },
  
    body('name', 'Name must be longer than 3 characters.').trim().isLength({ min: 3 }).escape(),
    body('name', 'Name must be shorter than 100 characters.').trim().isLength({ max: 100 }).escape(),
    body('content', 'Content must be longer than 3 characters.').trim().isLength({ min: 3 }).escape(),
  
    (req, res, next) => {
      const errors = validationResult(req);
  
      var comment = new Comment({
        name: req.body.name,
        content: req.body.content,
        timestamp: new Date(),
      })
  
      if (!errors.isEmpty()) {
        res.json({
          errors: errors.array(),
        })
        return;
      } else {
        comment.save(function(err) {
          if (err) return next(err);
          Post.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: comment } }, function(err) {
            if (err) return next(err);
            res.json({ message: "Comment posted succesfully!" });
          })
        })
      }
    }
  ]
]