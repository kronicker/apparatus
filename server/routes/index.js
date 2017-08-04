let routes = [
  'device',
  'user',
  'liability'
];

routes = routes.map(route => ({
  endpoint: route,
  router: require(`./${route}`)
}));

module.exports = app => {
  routes.forEach(({ endpoint, router }) => app.use(`/api/${endpoint}`, router));
};
