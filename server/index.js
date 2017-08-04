const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');

const log = require('./logger').serverLogger;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./db');
require('./routes')(app);


const port = config.get('server.port');
app.listen(port, () => {
  log.info(`Server running on port ${port}`);
});
