const jwt = require('jsonwebtoken');
const SECRET = 'your_super_secret_key'; // move to .env in prod

exports.generateToken = (user) => {
  return jwt.sign({ email: user.email, role: user.role }, SECRET, { expiresIn: '2h' });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};
