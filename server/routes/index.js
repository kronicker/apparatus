const { readModules } = require('../lib/utils');

const routes = readModules(__dirname)
  .map(file => require(`./${file}`));

module.exports = app => routes.forEach(router => app.use('/api', router));
