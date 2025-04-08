exports.formatJSON = (req, res) => {
    const { json } = req.body;
  
    try {
      const parsed = JSON.parse(json);
      const formatted = JSON.stringify(parsed, null, 2);
      res.status(200).json({ success: true, formatted });
    } catch (err) {
      res.status(400).json({ success: false, message: 'Invalid JSON format.' });
    }
  };
  