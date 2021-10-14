const { PrismaClient } = require('@prisma/client');
const messages = require('../routes/messages');
const { message } = new PrismaClient();

module.exports = {
  createMessage: async (fullMessage) => {
    try {
      const newMessage = await message.create({
        data: {
          room_id: fullMessage.roomId,
          name: fullMessage.userName,
          text: fullMessage.message,
          user_id: fullMessage.userID
        },
      });
      return newMessage
    
    } catch (error) {
      console.log(error);
    }
  },

  getMessages: async (req, res) => {
    try {
      const rooms = await message.findMany({});
      res.send(rooms); 
    } catch (error) {
      console.log(error);
    }
  },

  getMessagesByRoom: async (req, res) => {
    try {
      const { rid } = req.params;
      const messagesByRoom = await message.findMany({
        where: {
          room_id: parseInt(rid, 10)
      }})
      res.send(messagesByRoom);
    } catch (error) {
      console.log(error)
    }
  }
};