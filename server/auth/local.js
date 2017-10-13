const { User } = require('../db').models;
const LocalStrategy = require('passport-local').Strategy;
const options = { usernameField: 'email' };

function checkPassword(user, password, done) {
  return user.validPassword(password)
    .then(valid => {
      if (!valid) return done(null, false, { message: 'Incorrect password.' });
      return done(null, user);
    })
    .catch(err => done(err));
}

function authenticate(email, password, done) {
  return User.find({ where: { email } })
    .then(user => {
      if (!user) return done(null, false, { message: 'Incorrect username.' });
      return checkPassword(user, password, done);
    });
}

module.exports = new LocalStrategy(options, authenticate);
