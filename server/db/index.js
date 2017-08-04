const config = require('config').get('database');
const fs = require('fs');
const path = require('path');
const invoke = require('lodash/invoke');
const Sequelize = require('sequelize');

const log = require('../logger').serverLogger;

const { name, user, password } = config;
const sequelize = new Sequelize(name, user, password, config);

const db = { Sequelize, sequelize, models: {} };

findModels(__dirname)
  .map(file => importModel(file))
  .map(model => invoke(model, 'associate', db.models));

db.sequelize.authenticate()
  .then(() => log.info('Connection to database has been established successfully.'))
  .catch(err => log.error('Unable to connect to the database:', err));

db.sequelize.sync()
  .then(() => log.info('Tables synced successfully.'))
  .catch(err => log.error('Unable to sync database tables:', err));

module.exports = db;

function findModels(directory) {
  return fs.readdirSync(directory)
  .filter(file => file !== 'index.js');
}

function importModel(file) {
  const model = sequelize.import(path.join(__dirname, file));
  db.models[model.name] = model;
  return model;
}
