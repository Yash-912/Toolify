const beautify = require('js-beautify');

exports.formatCode = (req, res) => {
  const { code = '', language = 'html' } = req.body;

  if (!code || !['html', 'css', 'js'].includes(language)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input. Provide code and a supported language (html, css, js).'
    });
  }

  try {
    let formatted = '';

    switch (language) {
      case 'html':
        formatted = beautify.html(code);
        break;
      case 'css':
        formatted = beautify.css(code);
        break;
      case 'js':
        formatted = beautify.js(code);
        break;
    }

    return res.status(200).json({ success: true, formatted });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Formatting failed.', error: err.message });
  }
};
