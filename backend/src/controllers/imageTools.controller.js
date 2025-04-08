const QRCode = require('qrcode');
const bwipjs = require('bwip-js');
exports.generateQRCode = async (req, res) => {
  const { text = '' } = req.body;

  if (!text) {
    return res.status(400).json({
      success: false,
      message: 'Text is required to generate QR code.'
    });
  }

  try {
    const qrImage = await QRCode.toDataURL(text);
    return res.status(200).json({
      success: true,
      qrCode: qrImage // base64 PNG
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'QR code generation failed.',
      error: err.message
    });
  }
};

exports.generateBarcode = async (req, res) => {
    const { text = '', format = 'code128' } = req.body;
  
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Text is required to generate a barcode.'
      });
    }
  
    try {
      const png = await bwipjs.toBuffer({
        bcid: format,       // Barcode type
        text: text,         // Text to encode
        scale: 3,           // 3x scaling factor
        height: 10,         // Bar height, in mm
        includetext: true,  // Show human-readable text
        textxalign: 'center'
      });
  
      const base64Image = `data:image/png;base64,${png.toString('base64')}`;
  
      return res.status(200).json({
        success: true,
        barcode: base64Image
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Barcode generation failed.',
        error: err.message
      });
    }
  };