const bunyan = require('bunyan');

const serverLogger = bunyan.createLogger({ name: 'server' });

module.exports = {
  serverLogger
};
