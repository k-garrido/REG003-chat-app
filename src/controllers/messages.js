const { PrismaClient } = require('@prisma/client');
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
  getMessages: async () => {
    try {
      const rooms = await message.findMany({});
      return rooms
    } catch (error) {
      console.log(error);
    }
  },
};