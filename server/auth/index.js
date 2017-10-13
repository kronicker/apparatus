const passport = require('passport');
const local = require('./local');
const { User } = require('../db').models;

passport.use(local);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id)
  .then(user => done(null, user))
  .catch(err => done(err)));

module.exports = passport;
