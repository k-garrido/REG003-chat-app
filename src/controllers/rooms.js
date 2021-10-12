const { PrismaClient } = require('@prisma/client');
const { room } = new PrismaClient();

module.exports = {
  createRoom: async (roomName) => {
    try {
      const roomExist = await room.findUnique({
        where: {
          name: roomName
        },
      });
      if (roomExist) {
        return console.error('La sala ya existe')
      }
      const newRoom = await room.create({
        data: {
          name: roomName
        },
      });
      return newRoom
    
    } catch (error) {
      console.log(error);
    }
  },
  getRooms: async () => {
    try {
      const rooms = await room.findMany({
      });
      return rooms
    } catch (error) {
      console.log(error);
    }
  },
};
