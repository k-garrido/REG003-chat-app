const express = require('express');
const app = express();
const pkg = require('../package.json');
const errorHandler = require('./middlewares/error');
const routes = require('./routes');
const config = require('../config');
const cors = require('cors');
const { Server } = require("socket.io");
const { createRoom, getRooms } = require('./controllers/rooms');
const { createMessage } = require('./controllers/messages');
const { addUser, getUser, removeUser } = require('./utils');


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

    // 1.2. Escuchando el evento de creacion de una sala y emitiendo los datos a todos los sockets conectados.
    socket.on('createRoom', async (room) => { 
      const newRoom = await createRoom(room);
      io.emit('createdRoom', newRoom);
    })
    // 2.1 Recibiendolos todas las salas de chat guardadas en postgres y emitiendo el evento con sus datos.
    getRooms().then (res => {
      socket.emit('allRooms', res);
    }).catch (error => {
      console.log(error); 
    })
    // 3.2 Escuchando el evento para unir a un usuario a una sala.
    socket.on('join', ({ name, room_id, user_id }) => {
      const { error, user } = addUser({
          socket_id: socket.id,
          name,
          room_id,
          user_id
      })
      socket.join(room_id);
      if (error) {
          console.log('join error', error)
      } else {
          console.log('join user', user)
      }
  })  
    // 4.2 Escuchando el evento de creacion de mensajes y emitiendo el mensaje a los demas sockets que estan en la sala.
    socket.on('sendMessage', async (message, roomId) => {
      const user = getUser(socket.id);
      fullMessage = {
        userName: user.name,
        userID: parseInt(user.user_id, 10),
        roomId: parseInt(roomId, 10),
        message,
      };
      const newMessage = await createMessage(fullMessage);
      io.to(roomId).emit('createdMessage', newMessage);
      console.log(fullMessage); 
    })
    socket.on('disconnectSocket', () => {
      removeUser(socket.id);
  })
  });
});
