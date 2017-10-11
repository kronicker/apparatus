const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 8;

function hash(password) {
  return bcrypt.hash(password, SALT_WORK_FACTOR);
}

module.exports = { hash };
