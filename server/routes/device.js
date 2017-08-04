const router = require('express').Router();
const { Device } = require('../db');

function check(req, res) {
  res.send('It works!!');
}

router.get('/', check);

module.exports = router;
