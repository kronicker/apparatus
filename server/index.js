const config = require('config');
const express = require('express');

const log = require('./logger').serverLogger;

const app = express();

require('./db');
require('./routes')(app);

const port = config.get('server.port');
app.listen(port, () => {
  log.info(`Server running on port ${port}`);
});
