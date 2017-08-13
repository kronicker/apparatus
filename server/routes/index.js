const { filename, readModules } = require('../lib/utils');

function importRouter(file) {
  const endpoint = filename(file);
  const router = require(`./${file}`);
  return { endpoint, router };
}

const routes = readModules(__dirname)
  .map(file => importRouter(file));

module.exports = app => {
  routes.forEach(({ endpoint, router }) => app.use(`/api/${endpoint}`, router));
};
