module.exports = {
  server: {
    port: 4000
  },
  database: {
    dialect: 'mysql',
    name: 'apparatus',
    host: 'localhost',
    user: 'apparatus_dev',
    password: 'apparatus',
    pool: {
      min: 0,
      max: 5,
      idle: 10000
    }
  }
};
