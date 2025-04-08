const axios = require('axios');

exports.sendApiRequest = async (req, res) => {
  const { method, url, headers, body } = req.body;

  if (!method || !url) {
    return res.status(400).json({ success: false, message: 'Method and URL are required.' });
  }

  try {
    const response = await axios({
      method: method.toLowerCase(),
      url,
      headers: headers || {},
      data: body || {},
      validateStatus: () => true // allow all status codes
    });

    return res.status(200).json({
      success: true,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'API request failed.',
      error: err.message
    });
  }
};
