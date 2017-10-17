const passport = require('passport');
const router = require('express').Router();

router.post('/auth/login', passport.authenticate('local'),
  (req, res) => res.json({ id: req.user.id, email: req.user.email }));

router.get('/auth/logout', (req, res) =>
  req.session.destroy(() => res.json('Logged Out')));

module.exports = router;
