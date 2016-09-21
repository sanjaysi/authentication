const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// define model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// Before saving the model, run this
userSchema.pre('save', function(next) {
    const user = this; // set context of function to user i.e. user is instance of user model

    // generate a salt, take some amount of time (millisecond) and hence a callback
    // is passed to run after salt is generated
    bcrypt.genSalt(10, function(err, salt) {
      if (err)  { return next(err); }

      // hash (mean encrypt) the password using the salt; it again take some time, and hence
      // callback defined on has generated
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) {return next(err); }

        user.password = hash;
        // next() is to go ahead and save the model
        next();
      });
    });
});

// create model class
const ModelClass = mongoose.model('user', userSchema);

// export model for others to use
module.exports = ModelClass;
