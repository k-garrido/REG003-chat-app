const express = require('express');
const app = express();
const pkg = require('../package.json');
const errorHandler = require('./middlewares/error');
const routes = require('./routes');
const config = require('../config');
const cors = require('cors');
const { Server } = require("socket.io");
const { createRoom } = require('./controllers/rooms')


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

  // Coneccion a socket
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
    // Escuchando el evento de creacion de salas
    socket.on('createRoom', (room) => { 
      const newRoom = createRoom(room);
      console.log(newRoom);
      io.emit('createdRoom', newRoom);
    })
    // Escuchando el evento de creacion de mensajes
    socket.on('sendMessage', (message, roomId) => {
      fullMessage = {
        userName: 'prueba',
        roomId,
        message,w

      };
      console.log(fullMessage);
      // Emitiendo el mensaje completo a todos los usuarios.
      io.emit('finalMessage', fullMessage);
    })
  });
});
