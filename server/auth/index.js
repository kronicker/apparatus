const config = require('config');
const local = require('./local');
const passport = require('passport');
const session = require('express-session');
const { User } = require('../db').models;

passport.use(local);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

module.exports = app => {
  app.use(session({
    secret: config.get('session.secret'),
    resave: false,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
};
