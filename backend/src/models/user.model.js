// const users = [];
// const mongoose = require('mongoose');

// module.exports = {
//   users,
//   findUser: (email) => users.find((u) => u.email === email),
//   addUser: (user) => users.push(user)
// };


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // add other fields as needed
});

module.exports = mongoose.model('User', userSchema);
