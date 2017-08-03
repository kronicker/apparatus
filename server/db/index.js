const Sequelize = require('sequelize');
const dbConfig = require('config').get('database');

const log = require('../logger').serverLogger;

const { dialect, host, user, password, name, pool } = dbConfig;

const connection = new Sequelize(name, user, password, {
  host,
  dialect,
  pool
});

connection.authenticate()
  .then(() => {
    log.info('Connection has been established successfully.');
  })
  .catch(err => {
    log.error('Unable to connect to the database:', err);
  });

module.exports = connection;
