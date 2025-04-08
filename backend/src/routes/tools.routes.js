const express = require('express');
const router = express.Router();

const {
  formatJSON
} = require('../controllers/jsonFormatter.controller');

const { generatePassword } = require('../controllers/passwordGenerator.controller');
const {
    generateRandomNumbers,
    generateUUIDs
  } = require('../controllers/randomGenerator.controller');
  
  const { csvToJson, jsonToCsv } = require('../controllers/csvTools.controller');
  const { formatCode } = require('../controllers/codeFormatter.controller');
  const { generateQRCode, generateBarcode } = require('../controllers/imageTools.controller');
  const { colorPicker, colorPalette } = require('../controllers/colorTools.controller');
  
  const {
    convertImageFormat,
    imageToBase64,
    base64ToImage
  } = require('../controllers/imageConverter.controller');
  const { resizeImage } = require('../controllers/imageConverter.controller');
  const { compressImage } = require('../controllers/imageConverter.controller');
  const { sendApiRequest } = require('../controllers/apiTools.controller');
  const {
    lookupIP,
    dnsLookup,
    pingHost
  } = require('../controllers/networkTools.controller');
  const { authMiddleware, paidOnly } = require('../middleware/auth.middleware');  
  
  
  router.post('/json-formatter', authMiddleware, paidOnly,formatJSON);
router.post('/password-generator', authMiddleware,generatePassword); //login
router.post('/random-number', authMiddleware,generateRandomNumbers); //login
router.post('/uuid-generator', authMiddleware, paidOnly,generateUUIDs);
router.post('/csv-to-json', authMiddleware, paidOnly,csvToJson);//paid
router.post('/json-to-csv', authMiddleware, paidOnly,jsonToCsv);
router.post('/qr-generator', authMiddleware, paidOnly,generateQRCode);
router.post('/code-formatter', authMiddleware, paidOnly, formatCode); //paid
router.post('/barcode-generator', authMiddleware, paidOnly,generateBarcode);
router.post('/color-picker', authMiddleware, paidOnly,colorPicker);
router.post('/color-palette', authMiddleware, paidOnly,colorPalette);
router.post('/image-convert', authMiddleware, paidOnly,convertImageFormat);

router.post('/image-convert', authMiddleware, paidOnly,convertImageFormat);
router.post('/image-to-base64', authMiddleware, paidOnly,imageToBase64);
router.post('/base64-to-image', authMiddleware, paidOnly,base64ToImage);
router.post('/resize-image', authMiddleware, paidOnly,resizeImage);
router.post('/compress-image', authMiddleware, paidOnly,compressImage);
router.post('/send-api-request', authMiddleware, paidOnly,sendApiRequest);

router.get('/ip-lookup', authMiddleware, paidOnly,lookupIP);
router.get('/dns-lookup', authMiddleware, paidOnly,dnsLookup);
router.get('/ping', authMiddleware, paidOnly,pingHost);



module.exports = router;
