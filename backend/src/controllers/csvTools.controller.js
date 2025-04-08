const Papa = require('papaparse');
const { Parser } = require('json2csv');

exports.csvToJson = (req, res) => {
  const { csv } = req.body;

  if (!csv || typeof csv !== 'string') {
    return res.status(400).json({ success: false, message: 'CSV input is required as a string.' });
  }

  const results = Papa.parse(csv.trim(), {
    header: true,
    skipEmptyLines: true
  });

  if (results.errors.length) {
    return res.status(400).json({ success: false, message: 'Error parsing CSV.', errors: results.errors });
  }

  return res.status(200).json({ success: true, json: results.data });
};

exports.jsonToCsv = (req, res) => {
  const { json } = req.body;

  if (!Array.isArray(json)) {
    return res.status(400).json({ success: false, message: 'Input must be a JSON array.' });
  }

  try {
    const parser = new Parser();
    const csv = parser.parse(json);
    return res.status(200).json({ success: true, csv });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error converting JSON to CSV.', error: err.message });
  }
};
