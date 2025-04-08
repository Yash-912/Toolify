const { verifyToken } = require('../utils/jwt');

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ success: false, message: 'Missing or invalid token' });

  try {
    const token = authHeader.split(' ')[1];
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }
};

exports.paidOnly = (req, res, next) => {
  if (req.user?.role !== 'paid') {
    return res.status(403).json({ success: false, message: 'Paid tier access only' });
  }
  next();
};
