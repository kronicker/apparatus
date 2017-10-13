const passport = require('../auth');
const router = require('express').Router();

router.post('/auth/login', passport.authenticate('local'),
  (req, res) => {
    return res.status(200).json({
      id: req.user.id,
      email: req.user.email
    });
  });

router.get('/auth/logout', (req, res) => {
  req.session.destroy(() => res.status(200).send('Logged Out'));
});

module.exports = router;
