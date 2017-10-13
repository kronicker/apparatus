const fs = require('fs');
const bcrypt = require('bcrypt');
const salt = require('config').get('hash.salt');

function hash(password) {
  return bcrypt.hash(password, salt);
}

function readModules(directory) {
  return fs.readdirSync(directory)
    .filter(file => file !== 'index.js');
}

module.exports = { readModules, hash };
