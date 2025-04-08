const sharp = require('sharp');

exports.convertImageFormat = async (req, res) => {
  const file = req.files?.image;
  const targetFormat = req.body?.format || 'png'; // 'png' or 'jpeg'

  if (!file || !['png', 'jpeg', 'jpg'].includes(targetFormat)) {
    return res.status(400).json({ success: false, message: 'Image and valid format required.' });
  }

  try {
    const outputBuffer = await sharp(file.data)
      .toFormat(targetFormat === 'jpg' ? 'jpeg' : targetFormat)
      .toBuffer();

    const base64 = outputBuffer.toString('base64');
    const mime = `image/${targetFormat === 'jpg' ? 'jpeg' : targetFormat}`;

    return res.status(200).json({
      success: true,
      converted: `data:${mime};base64,${base64}`
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Image conversion failed.',
      error: err.message
    });
  }
};


// Convert uploaded image to Base64
exports.imageToBase64 = async (req, res) => {
    const file = req.files?.image;
  
    if (!file) {
      return res.status(400).json({ success: false, message: 'Image file is required.' });
    }
  
    const base64 = file.data.toString('base64');
    const mime = file.mimetype;
  
    return res.status(200).json({
      success: true,
      base64: `data:${mime};base64,${base64}`
    });
  };
  
  // Convert Base64 to downloadable image
  exports.base64ToImage = async (req, res) => {
    const { base64 } = req.body;
  
    if (!base64 || !base64.startsWith('data:')) {
      return res.status(400).json({ success: false, message: 'Valid base64 string required.' });
    }
  
    try {
      const matches = base64.match(/^data:(.+);base64,(.+)$/);
      const mimeType = matches[1];
      const buffer = Buffer.from(matches[2], 'base64');
  
      res.set({
        'Content-Type': mimeType,
        'Content-Disposition': 'attachment; filename=converted-image'
      });
  
      return res.send(buffer);
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Base64 to image conversion failed.', error: err.message });
    }
  };
  

  exports.resizeImage = async (req, res) => {
    const file = req.files?.image;
    const { width, height } = req.body;
  
    if (!file || (!width && !height)) {
      return res.status(400).json({
        success: false,
        message: 'Image file and at least one of width or height are required.'
      });
    }
  
    try {
      const numericWidth = width ? parseInt(width) : null;
      const numericHeight = height ? parseInt(height) : null;
  
      const resizedBuffer = await sharp(file.data)
        .resize({
          width: numericWidth,
          height: numericHeight,
          fit: 'inside',
        })
        .toBuffer();
  
      const base64 = resizedBuffer.toString('base64');
      const mime = file.mimetype;
  
      return res.status(200).json({
        success: true,
        resized: `data:${mime};base64,${base64}`
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Image resizing failed.',
        error: err.message
      });
    }
  };
  

  exports.compressImage = async (req, res) => {
    const file = req.files?.image;
    const { quality = 70 } = req.body;
  
    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'Image file is required.'
      });
    }
  
    const mime = file.mimetype;
  
    try {
      let outputBuffer;
  
      if (mime.includes('jpeg') || mime.includes('jpg')) {
        outputBuffer = await sharp(file.data)
          .jpeg({ quality: parseInt(quality) })
          .toBuffer();
      } else if (mime.includes('png')) {
        outputBuffer = await sharp(file.data)
          .png({ quality: parseInt(quality), compressionLevel: 9 })
          .toBuffer();
      } else if (mime.includes('webp')) {
        outputBuffer = await sharp(file.data)
          .webp({ quality: parseInt(quality) })
          .toBuffer();
      } else {
        return res.status(400).json({
          success: false,
          message: 'Unsupported image format. Only JPEG, PNG, WebP are supported.'
        });
      }
  
      const base64 = outputBuffer.toString('base64');
  
      return res.status(200).json({
        success: true,
        compressed: `data:${mime};base64,${base64}`
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Image compression failed.',
        error: err.message
      });
    }
  };
  