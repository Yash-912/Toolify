const bcrypt = require('bcryptjs');
const { users, findUser, addUser } = require('../models/user.model');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  const { email, password, role = 'free' } = req.body;
  if (findUser(email)) return res.status(400).json({ success: false, message: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  addUser({ email, password: hashed, role });

  return res.status(201).json({ success: true, message: 'User registered successfully' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = findUser(email);
  if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ success: false, message: 'Invalid credentials' });

  const token = generateToken(user);
  return res.status(200).json({ success: true, token });
};
