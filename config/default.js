module.exports = {
  server: {
    port: 4000
  },
  database: {
    name: 'apparatus',
    user: 'apparatus_dev',
    password: 'apparatus',
    options: {
      dialect: 'mysql',
      host: 'localhost',
      pool: {
        min: 0,
        max: 5,
        idle: 10000
      },
      logging: true
    }
  }
};
