const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', function(req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something went wrong',
        user,
        info
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) res.json({ error: err });

      const token = jwt.sign(user.toJSON(), 'secret');
      return res.json({ user, token });
    })
  })(req, res);
})

module.exports = router;