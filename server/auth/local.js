const LocalStrategy = require('passport-local').Strategy;
const options = { usernameField: 'email' };
const { User } = require('../db').models;

const message = 'Incorrect email or password.';

function checkPassword(user, password, done) {
  return user.validPassword(password)
    .then(valid => {
      if (!valid) return done(null, false, { message });
      return done(null, user);
    })
    .catch(err => done(err));
}

function authenticate(email, password, done) {
  return User.find({ where: { email } })
    .then(user => {
      if (!user) return done(null, false, { message });
      return checkPassword(user, password, done);
    });
}

module.exports = new LocalStrategy(options, authenticate);
