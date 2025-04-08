const users = [];
const mongoose = require('mongoose');

module.exports = {
  users,
  findUser: (email) => users.find((u) => u.email === email),
  addUser: (user) => users.push(user)
};
