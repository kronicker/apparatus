const config = require('config');
const express = require('express');

const app = express();

const port = config.get('server.port');
app.listen(port, () => {
  console.log(`Server running on port ${port}`); // eslint-disable-line no-console
});
