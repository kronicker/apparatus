const config = require('config').get('database');
const { readModules } = require('../lib/utils');
const invoke = require('lodash/invoke');
const Sequelize = require('sequelize');
require('sequelize-virtual-fields')(Sequelize);

const log = require('../logger')('server');

const { name, user, password, options } = config;
const sequelize = new Sequelize(name, user, password, options);
const DataTypes = sequelize.Sequelize.DataTypes;
sequelize.initVirtualFields();

const db = { Sequelize, sequelize, models: {} };

function defineModel(Model) {
  const fields = invoke(Model, 'fields', DataTypes, sequelize) || {};
  const hooks = invoke(Model, 'hooks', sequelize) || {};
  const model = Model.init(fields, { sequelize, hooks });
  db.models[model.name] = model;
  return model;
}

readModules(__dirname)
  .map(path => defineModel(require(path)))
  .map(model => invoke(model, 'associate', db.models));

db.sequelize.authenticate()
  .then(() => log.info('Connection to database has been established successfully.'))
  .catch(err => log.error('Unable to connect to the database:', err));

db.sequelize.sync()
  .then(() => log.info('Tables synced successfully.'))
  .catch(err => log.error('Unable to sync database tables:', err));

module.exports = db;
