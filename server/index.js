const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const log = require('./logger')('server');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('short'));
app.use(helmet());

require('./db');
require('./routes')(app);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const port = config.get('server.port');
app.listen(port, () => {
  log.info(`Server running on port ${port}`);
});
