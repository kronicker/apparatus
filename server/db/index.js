const dbConfig = require('config').get('database');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const log = require('../logger').serverLogger;

const { dialect, host, user, password, name, pool } = dbConfig;

const db = {
  Sequelize,
  sequelize: new Sequelize(name, user, password, { host, dialect, pool }),
  models: {}
};

function importModel(file) {
  const model = db.sequelize.import(path.join(__dirname, file));
  db.models[model.name] = model;
  return model;
}

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .map(importModel)
  .filter(model => model.associate)
  .map(model => model.associate(db.models));

db.sequelize.authenticate()
  .then(() => {
    log.info('Connection to database has been established successfully.');
  })
  .catch(err => {
    log.error('Unable to connect to the database:', err);
  });

db.sequelize.sync()
  .then(() => {
    log.info('Tables synced successfully.');
  })
  .catch(err => {
    log.error('Unable to sync database tables:', err);
  });

module.exports = db;
