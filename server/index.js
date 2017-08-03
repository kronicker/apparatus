const config = require('config');
const express = require('express');

const db = require('./db');
const log = require('./logger').serverLogger;

const app = express();

const port = config.get('server.port');
app.listen(port, () => {
  log.info(`Server running on port ${port}`);
});
