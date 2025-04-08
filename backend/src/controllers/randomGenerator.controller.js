const { v4: uuidv4 } = require('uuid');

exports.generateRandomNumbers = (req, res) => {
  const { min = 0, max = 100, count = 1 } = req.body;

  if (min >= max || count < 1) {
    return res.status(400).json({ success: false, message: 'Invalid input values.' });
  }

  const numbers = Array.from({ length: count }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  res.status(200).json({ success: true, numbers });
};

exports.generateUUIDs = (req, res) => {
  const { count = 1 } = req.body;

  if (count < 1 || count > 1000) {
    return res.status(400).json({ success: false, message: 'Count must be between 1 and 1000.' });
  }

  const uuids = Array.from({ length: count }, () => uuidv4());

  res.status(200).json({ success: true, uuids });
};
