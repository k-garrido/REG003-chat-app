const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();
const bcrypt = require('bcrypt');

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          admin: true,
        },
      });
      res.send(users);
    } catch (error) {
      console.log(error);
    }
  },

  getUser: (req, res) => {
    res.send('user');
  },

  createUser: async (req, res) => {
    try {
      const { name, email, password, admin } = req.body;
      const userExist = await user.findUnique({
        where: {
          email,
        },
      });
      if (userExist) {
        return res.status(403).send('Email ya registrado');
      }
      const newUser = await user.create({
        data: {
          name,
          email,
          password: bcrypt.hashSync(password, 10),
          admin,
        },
        select: {
          name: true,
          email: true,
          admin: true,
        },
      });
      res.status(200).send(newUser);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  updateUser: (req, res) => {
    res.send('update User');
  },
  deleteUser: (req, res) => {
    res.send('delete User');
  },
};
