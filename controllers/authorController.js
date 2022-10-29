const Post = require('../models/post');
const Comment = require('../models/comment');
const Author = require('../models/author');
const async = require('async');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.author_list = function (req, res, next) {
  async.parallel(
    {
      authors: function (callback) {
        Author.find({})
          .select(['firstname', 'lastname', 'username'])
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results.authors == null) {
        var err = new Error('No authors found');
        err.status = 404;
        return next(err);
      }
      res.json({
        authors: results.authors,
      });
    }
  );
};

exports.author_create = [
  (req, res, next) => {
    next();
  },

  body('firstname', 'First name must be longer than 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('firstname', 'First name must be shorter than 100 characters.')
    .trim()
    .isLength({ max: 100 })
    .escape(),
  body('lastname', 'Last name must be longer than 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('lastname', 'Last name must be shorter than 100 characters.')
    .trim()
    .isLength({ max: 100 })
    .escape(),
  body('username', 'Username must be longer than 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('username', 'Username must be shorter than 100 characters.')
    .trim()
    .isLength({ max: 100 })
    .escape(),
  body('username', 'Username is already in use.').custom((value, { req }) => {
    return new Promise((resolve, reject) => {
      Author.findOne({ username: req.body.username }, function (err, author) {
        if (err) return next(err);
        if (author && author.username == value) {
          reject(new Error('Username is already in use.'));
        }
        resolve(true);
      });
    });
  }),
  body('password', 'Password must be longer than 8 characters').isLength({
    min: 8,
  }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) return next(err);
        var author = new Author({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          password: hashedPassword,
        }).save((err, newAuthor) => {
          if (err) return next(err);
          res.json({
            message: 'Signup complete!',
            author: newAuthor,
          });
        });
      });
    }
  },
];

exports.author_delete = function (req, res, next) {
  jwt.verify(req.token, 'secret', (err, authData) => {
    if (err) {
      res.json({
        error: err,
        message: 'You do not have permission to delete an author.',
      });
      return;
    }
    async.parallel(
      {
        author: function (callback) {
          Author.findById(req.params.id).exec(callback);
        },
        posts: function (callback) {
          Post.find({ 'author.id': req.params.id }).exec(callback);
        },
      },
      function (err, results) {
        if (err) return next(err);
        if (results.posts.length > 0) {
          res.json({
            message:
              'Please delete all of the posts by this author before deleting the author.',
          });
          return;
        }
        if (results.author == null) {
          res.json({
            error: 404,
            message: 'Author not found.',
          });
          return;
        }
        if (authData.username != results.author.username) {
          res.json({
            error: 403,
            message: 'You do not have permission to delete this author.',
          });
          return;
        }
        Author.findByIdAndRemove(results.author._id, function (err, theAuthor) {
          if (err) return next(err);
          res.json({
            message: 'Author successfully removed!',
            author: theAuthor,
          });
        });
        return;
      }
    );
  });
};

exports.author_update = [
  (req, res, next) => {
    jwt.verify(req.token, 'secret', function (err, authData) {
      if (err) {
        res.json({
          error: 403,
          message: 'You do not have permission to update authors',
        });
      } else {
        req.authData = authData;
        next();
      }
    });
  },

  body('firstname', 'First name must be longer than 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('firstname', 'First name must be shorter than 100 characters.')
    .trim()
    .isLength({ max: 100 })
    .escape(),
  body('lastname', 'Last name must be longer than 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('lastname', 'Last name must be shorter than 100 characters.')
    .trim()
    .isLength({ max: 100 })
    .escape(),
  body('username', 'Username must be longer than 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('username', 'Username must be shorter than 100 characters.')
    .trim()
    .isLength({ max: 100 })
    .escape(),
  body('username', 'Username is already in use.').custom((value, { req }) => {
    return new Promise((resolve, reject) => {
      Author.findOne({ username: req.body.username }, function (err, author) {
        if (err) return next(err);
        if (
          author &&
          author.username == value &&
          author.username != req.authData.username
        ) {
          reject(new Error('Username is already in use.'));
        }
        resolve(true);
      });
    });
  }),
  body('password', 'Password must be longer than 8 characters').isLength({
    min: 8,
  }),

  (req, res, next) => {
    async.parallel(
      {
        author: function (callback) {
          Author.findById(req.params.id).exec(callback);
        },
      },
      function (err, results) {
        if (err) return next(err);
        if (results.author.username != req.authData.username) {
          res.json({
            error: 403,
            message: 'You do not have permission to update this author.',
          });
          return;
        }
        const errors = validationResult(req);
        if (results.author == null) {
          res.json({
            error: 404,
            message: 'Author not found',
          });
          return;
        }
        if (!errors.isEmpty()) {
          res.json({ errors: errors.array() });
          return;
        } else {
          bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) return next(err);
            var author = new Author({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              username: req.body.username,
              password: hashedPassword,
              _id: req.params.id,
            });
            Author.findByIdAndUpdate(
              req.params.id,
              author,
              { new: true },
              function (err, newAuthor) {
                if (err) return next(err);
                res.json({
                  message: 'Author succesfully updated!',
                  author: newAuthor,
                });
              }
            );
          });
        }
      }
    );
  },
];
