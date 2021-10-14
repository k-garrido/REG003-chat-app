const users = require('./users');
const auth = require('./auth');
const messages = require('./messages');

const root = (app, next) => {
  const pkg = app.get('pkg');
  app.get('/', (req, res) => res.json({ name: pkg.name, version: pkg.version, msg:'hola mundo' }));
  app.all('*', (req, resp, next) => next(404));
  return next();
};

const register = (app, routes, cb) => {
  if (!routes.length) {
    return cb();
  }

  routes[0](app, (err) => {
    if (err) {
      return cb(err);
    }
    return register(app, routes.slice(1), cb);
  });
};


module.exports = (app, next) => register(app, [
  users,
  auth,
  messages,
  root,
], next); 