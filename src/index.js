const express = require('express');
const app = express();
const pg = require("pg");
const pkg = require('../package.json');
const errorHandler = require('./middlewares/error');
const routes = require('./routes');
const { port } = require('../config');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Settings
app.set('pkg', pkg);

// Routes
routes(app, (err) => {
  if (err) {
    throw err;
  }
  app.use(errorHandler);
  app.listen(port, () => {
    console.info(`App listening at http://localhost:${port}`);
  });
});
