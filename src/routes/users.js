const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/users');

module.exports = (app, next) => {
  app.get('/users', getUsers);
  app.get('/users/:uid', getUser);
  app.post('/users', createUser);
  app.put('/users/:uid', updateUser);
  app.delete('/users/:uid', deleteUser);
  next()
}