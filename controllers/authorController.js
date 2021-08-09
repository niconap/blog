const Post = require('../models/post');
const Comment = require('../models/comment');
const Author = require('../models/author');
const async = require('async');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');

exports.author_list = function(req, res, next) {
  async.parallel({
    authors: function(callback) {
      Author.find({}).exec(callback);
    }
  }, function(err, results) {
    if (err) return next(err);
    if (results.authors == null) {
      var err = new Error("No authors found");
      err.status = 404;
      return next(err);
    }
    res.json(results.authors);
  })
}

exports.author_create = [
  (req, res, next) => {
    next();
  },

  body('firstname', 'First name must be longer than 3 characters.').trim().isLength({ min: 3 }).escape(),
  body('firstname', 'First name must be shorter than 100 characters.').trim().isLength({ max: 100 }).escape(),
  body('lastname', 'Last name must be longer than 3 characters.').trim().isLength({ min: 3 }).escape(),
  body('lastname', 'Last name must be shorter than 100 characters.').trim().isLength({ max: 100 }).escape(),
  body('username', 'Username must be longer than 3 characters.').trim().isLength({ min: 3 }).escape(),
  body('username', 'Username must be shorter than 100 characters.').trim().isLength({ max: 100 }).escape(),
  body('username', 'Username is already in use.').custom((value, { req }) => {
    return new Promise((resolve, reject) => {
      Author.findOne({ username: req.body.username }, function(err, author) {
        if (err) return next(err);
        if (author && author.username == value) {
          reject(new Error('Username is already in use.'))
        }
        resolve(true);
      });
    });
  }),
  body('password', 'Password must be longer than 8 characters').isLength({ min: 8 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({errors: errors.array()});
      return;
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) return next(err);
        var author = new Author({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          password: hashedPassword,
        }).save(err => {
          if (err) return next(err);
          res.json({
            message: "Signup complete!",
            author,
          })
        })
      })
    }
  }
]