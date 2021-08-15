const Post = require('../models/post');
const Comment = require('../models/comment');
const Author = require('../models/author');
const async = require('async');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Get all of the posts in an array
exports.post_list_public = function (req, res, next) {
  async.parallel(
    {
      posts: function (callback) {
        Post.find({ public: true }).populate('comments').exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results.posts == null) {
        var err = new Error('No posts found');
        err.status = 404;
        return next(err);
      }
      res.json(results.posts);
    }
  );
};

exports.post_list_private = function (req, res, next) {
  jwt.verify(req.token, 'secret', (err, authData) => {
    if (err) {
      res.json({
        error: 403,
        message: 'You do not have permission to view these posts.',
      });
      return;
    }
    async.parallel(
      {
        posts: function (callback) {
          Post.find({ 'author.username': authData.username })
            .populate('comments')
            .exec(callback);
        },
      },
      function (err, results) {
        if (err) return next(err);
        if (results.posts == null) {
          var err = new Error('No posts found');
          err.status = 404;
          return next(err);
        }
        res.json(results.posts);
      }
    );
  });
};

exports.post_detail = function (req, res, next) {
  async.parallel(
    {
      post: function (callback) {
        Post.findById(req.params.id)
          .populate('author')
          .select({ public: true })
          .populate('comments')
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results.post == null) {
        res.json({
          error: 404,
          message: 'Post not found.',
        });
      }
      res.json({
        post: results.post,
      });
    }
  );
};

// Create a new post
exports.post_create = [
  (req, res, next) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
      if (err) {
        res.json({
          error: 403,
          message: 'You do not have permission to create a new post.',
        });
      } else {
        req.authData = authData;
        next();
      }
    });
  },

  body('title', 'Title must be longer than 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('title', 'Title must be shorter than 100 characters.')
    .trim()
    .isLength({ max: 100 })
    .escape(),
  body('content', 'Content must be longer than 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('public', 'Public must be a boolean.').trim().isBoolean(),

  (req, res, next) => {
    const errors = validationResult(req);

    var post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: {
        firstname: req.authData.firstname,
        lastname: req.authData.lastname,
        username: req.authData.username,
        id: req.authData._id,
      },
      comments: [],
      timestamp: new Date(),
      public: req.body.public,
    });

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
      });
      return;
    } else {
      post.save(function (err) {
        if (err) return next(err);
        res.json({
          message: 'Post succesfully added!',
          post,
        });
      });
    }
  },
];

// Delete only your own posts
exports.post_delete = function (req, res, next) {
  jwt.verify(req.token, 'secret', (err, authData) => {
    if (err) {
      res.json({
        error: 403,
        message: 'You do not have permission to delete a post.',
      });
    }
    async.parallel(
      {
        post: function (callback) {
          Post.findById(req.params.id).exec(callback);
        },
      },
      function (err, results) {
        if (err) return next(err);
        if (results.post == null) {
          res.json({
            error: 404,
            message: 'No posts found.',
          });
        } else if (results.post.author.username == authData.username) {
          Post.findByIdAndRemove(results.post._id, function (err) {
            if (err) return next(err);
            res.json({
              message: 'Post successfully deleted!',
              post: results.post,
            });
          });
        } else {
          res.json({
            error: 403,
            message: 'You do not have permission to delete this post.',
          });
        }
      }
    );
  });
};

// Update only your own posts
exports.post_update = [
  (req, res, next) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.authData = authData;
        next();
      }
    });
  },

  body('title', 'Title must be longer than 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('title', 'Title must be shorter than 100 characters.')
    .trim()
    .isLength({ max: 100 })
    .escape(),
  body('content', 'Content must be longer than 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('public', 'Public must be a boolean.').trim().isBoolean(),

  (req, res, next) => {
    async.parallel(
      {
        post: function (callback) {
          Post.findById(req.params.id).exec(callback);
        },
      },
      function (err, results) {
        if (err) return next(err);
        if (results.post == null) {
          res.json({
            error: 404,
            message: 'Post not found.',
          });
          return;
        }
        const errors = validationResult(req);

        var post = new Post({
          title: req.body.title,
          content: req.body.content,
          author: {
            firstname: req.authData.firstname,
            lastname: req.authData.lastname,
            username: req.authData.username,
          },
          comments: [results.post.comments],
          timestamp: new Date(),
          public: req.body.public,
          _id: req.params.id,
        });

        if (!errors.isEmpty()) {
          res.json({
            errors: errors.array(),
          });
          return;
        } else {
          Post.findByIdAndUpdate(
            req.params.id,
            post,
            { new: true },
            function (err, newPost) {
              if (err) return next(err);
              res.json({
                message: 'Post succesfully updated!',
                post: newPost,
              });
            }
          );
        }
      }
    );
  },
];

// Display all the comments on a given post
exports.comment_list = function (req, res, next) {
  async.parallel(
    {
      post: function (callback) {
        Post.findOne({ _id: req.params.id })
          .populate(['comments'])
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results.post == null) {
        var err = new Error('Post not found');
        err.status = 404;
        return next(err);
      } else if (results.post.comments.length == 0) {
        var err = new Error('No comments found under this post');
        err.status = 404;
        return next(err);
      }
      res.json(results.post.comments);
    }
  );
};

// Create a comment on a specific post
exports.comment_create = [
  (req, res, next) => {
    next();
  },

  body('name', 'Name must be longer than 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('name', 'Name must be shorter than 100 characters.')
    .trim()
    .isLength({ max: 100 })
    .escape(),
  body('content', 'Content must be longer than 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    var comment = new Comment({
      name: req.body.name,
      content: req.body.content,
      timestamp: new Date(),
    });

    if (!errors.isEmpty()) {
      res.json({
        errors: errors.array(),
      });
      return;
    } else {
      comment.save(function (err) {
        if (err) return next(err);
        Post.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { comments: comment } },
          function (err) {
            if (err) return next(err);
            res.json({ message: 'Comment posted succesfully!' });
          }
        );
      });
    }
  },
];

exports.comment_delete = function (req, res, next) {
  async.parallel(
    {
      post: function (callback) {
        Post.findById(req.params.postid).exec(callback);
      },
      comment: function (callback) {
        Comment.findById(req.params.commentid).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      jwt.verify(req.token, 'secret', function (err, authData) {
        if (err) {
          res.json({
            error: 403,
            message: 'You do not have permission to delete comments.',
          });
          return;
        }
        if (results.post.author.username == authData.username) {
          Comment.findByIdAndRemove(
            req.params.commentid,
            function (err, comment) {
              if (err) return next(err);
              Post.findOneAndUpdate(
                { id: req.params.postid },
                { $pull: { comments: req.params.commentid } },
                function (err, post) {
                  res.json({
                    message: 'Comment succesfully removed!',
                    comment,
                    post,
                  });
                }
              );
            }
          );
        } else {
          res.json({
            error: 403,
            message: 'You do not have permission to delete this comment.',
          });
        }
      });
    }
  );
};
