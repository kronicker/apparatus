const { basename } = require('path');
const fs = require('fs');

function readModules(directory) {
  return fs.readdirSync(directory)
    .filter(file => file !== 'index.js');
}

function filename(file) {
  const [name] = basename(file).split('.');
  return name;
}

module.exports = {
  filename,
  readModules
};
