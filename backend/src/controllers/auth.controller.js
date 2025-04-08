// const bcrypt = require('bcryptjs');
// const { users, findUser, addUser } = require('../models/user.model');
// const { generateToken } = require('../utils/jwt');

// exports.register = async (req, res) => {
//   const { email, password, role = 'free' } = req.body;
//   if (findUser(email)) return res.status(400).json({ success: false, message: 'User already exists' });

//   const hashed = await bcrypt.hash(password, 10);
//   addUser({ email, password: hashed, role });

//   return res.status(201).json({ success: true, message: 'User registered successfully' });
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = findUser(email);
//   if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

//   const isValid = await bcrypt.compare(password, user.password);
//   if (!isValid) return res.status(401).json({ success: false, message: 'Invalid credentials' });

//   const token = generateToken(user);
//   return res.status(200).json({ success: true, token });
// };



const bcrypt = require('bcryptjs');
const User = require('../models/user.model'); // now the MongoDB model
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  try {
    const { email, password, role = 'free' } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to MongoDB
    const newUser = await User.create({
      email,
      password: hashedPassword,
      role
    });

    return res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error('Register Error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
