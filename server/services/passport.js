const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config');
const LocalStrategy = require('passport-local');

// create local Strategy
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    User.findOne({email: email.toLowerCase()}, function(err, user) {
      if (err) {return done(err);}
      if (!user) {return done(null, false);}

      user.comparePassword(password, function(err, isMatch) {
        if (err) {return done(err);}
        if (!isMatch) {return done(null, false);}

        return done(null, user);
      });
    });
});

// set options for jwt Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// create jwt Strategy
// payload is decoded authentication token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // check if the userid in payload exists in database
  // if yes, call done with user object
  // otherwise call done without user object
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
