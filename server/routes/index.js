const { readModules } = require('../lib/utils');

const routes = readModules(__dirname)
  .map(path => require(path));

module.exports = app => routes.forEach(router => app.use('/api', router));
