const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const helmet = require('helmet');
const passport = require('passport');

const log = require('./logger')('server');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('short'));
app.use(helmet());
app.use(session({
  secret: config.get('session.secret'),
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./db');
require('./routes')(app);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const port = config.get('server.port');
app.listen(port, () => {
  log.info(`Server running on port ${port}`);
});
