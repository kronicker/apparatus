const bunyan = require('bunyan');
const loggers = {
  server: bunyan.createLogger({ name: 'server' })
};

module.exports = name => loggers[name];
