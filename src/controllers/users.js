module.exports = {
   getUsers: (req, res) => {
    res.send('users');
  },
  getUser: (req, res) => {
    res.send('user');
  },
  createUser: (req, res) => {
    res.send('create User');
  },
  updateUser: (req, res) => {
    res.send('update User');
  },
  deleteUser: (req, res) => {
    res.send('delete User');
  }, 


}