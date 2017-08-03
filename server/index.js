const config = require('config');
const express = require('express');

const { serverLogger: log } = require('./logger');

const app = express();

const port = config.get('server.port');
app.listen(port, () => {
  log.info(`Server running on port ${port}`);
});
