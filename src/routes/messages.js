const { getMessages, getMessagesByRoom } = require('../controllers/messages');

module.exports = (app, next) => {
  app.get('/messages', getMessages);
  app.get('/messages/:rid', getMessagesByRoom);
  next();
};
