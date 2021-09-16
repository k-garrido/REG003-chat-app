const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config');
const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();
const { secret } = config;

module.exports = (app, nextMain) => {
  app.post('/auth', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(400);
      }
      const findUser = await user.findUnique({
        where: {
          email,
        },
      });
      console.log(findUser);
      if (findUser === null) {
        return next(404);
      }
      if (bcrypt.compareSync(password, findUser.password)) {
        const token = jwt.sign({ uid: findUser._id }, secret);
        res.send({ token });
      }
    } catch (error) {
      next(error);
    }
  });

  return nextMain();
};
