const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();

// Setting admin user
const initAdminUser = async (app, next) => {
  try {
    const { adminEmail, adminPassword } = app.get('config');
    if (!adminEmail || !adminPassword) {
      return next();
    }
    const userAdmin = await user.findUnique({
      where: {
        email: adminEmail,
      },
    });
    if (userAdmin) {
      console.info('El usuario Admin ya esta registrado');
      return next();
    }
    await user.create({
      data: {
        name: 'admin',
        email: adminEmail,
        password: bcrypt.hashSync(adminPassword, 10),
        admin: true,
      },
    });
    console.info('el usuario Admin ha sido creado');
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = (app, next) => {
  app.get('/users', getUsers);
  app.get('/users/:uid', getUser);
  app.post('/users', createUser);
  app.put('/users/:uid', updateUser);
  app.delete('/users/:uid', deleteUser);
  initAdminUser(app, next);
};
