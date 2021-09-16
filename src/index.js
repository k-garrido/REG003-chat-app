const express = require('express');
const app = express();
const pkg = require('../package.json');
const errorHandler = require('./middlewares/error');
const routes = require('./routes');
const config = require('../config');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Settings
app.set('pkg', pkg);
app.set('config', config);

// Routes
routes(app, (err) => {
  if (err) {
    throw err;
  }
  app.use(errorHandler);
  app.listen(config.port, () => {
    console.info(`App listening at http://localhost:${config.port}`);
  });
});
