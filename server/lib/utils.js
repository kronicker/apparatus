const fs = require('fs');

function readModules(directory) {
  return fs.readdirSync(directory)
    .filter(file => file !== 'index.js');
}

module.exports = { readModules };
