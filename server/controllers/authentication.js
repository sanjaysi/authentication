const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
    // jwt provides a sub (subject) property - who is the subject; here it is the user
    // iat - issued at time
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email: email}, function(err, existingUser) {
      if (err) {
        return next(err);
      }

      if (existingUser) {
        return res.status(422).send({error: 'Email in use'});
      }

      if (!email || !password) {
        return res.status(422).send({error: 'Both email and password should be present'});
      }

      const user = new User({
        email: email,
        password: password
      });
      user.save(function(err) {
        if (err) { return next(err); }

        res.json({token: tokenForUser(user)});
      });
  });
}

exports.signin = function(req, res, next) {
  console.log('exports.signin');
  res.send({token: tokenForUser(req.user)});
}
