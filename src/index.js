const express = require('express');
const app = express();
const pkg = require('../package.json');
const errorHandler = require('./middlewares/error');
const routes = require('./routes');
const config = require('../config');
const cors = require('cors');
const { Server } = require("socket.io");


// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Settings
app.set('pkg', pkg);
app.set('config', config);

// Routes
routes(app, (err) => {
  if (err) {
    throw err;
  }
  app.use(errorHandler);
  const server = app.listen(config.port, () => {
    console.info(`App listening at http://localhost:${config.port}`);
  });
  const io = new Server(server, {
    cors:{
      origin:"http://localhost:3000",
      methods: ["GET","POST"],
      credentials: true,
      allowEIO3: true
      },
      transport: ['websocket']
  });
  io.on('connection', (socket) => {
    console.log('a user connected');
  });
});
