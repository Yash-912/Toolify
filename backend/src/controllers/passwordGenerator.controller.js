exports.generatePassword = (req, res) => {
    const {
      length = 12,
      includeUppercase = true,
      includeLowercase = true,
      includeNumbers = true,
      includeSymbols = true
    } = req.body;
  
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  
    let charSet = '';
    if (includeUppercase) charSet += upper;
    if (includeLowercase) charSet += lower;
    if (includeNumbers) charSet += numbers;
    if (includeSymbols) charSet += symbols;
  
    if (!charSet) {
      return res.status(400).json({
        success: false,
        message: 'At least one character type must be selected.'
      });
    }
  
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      password += charSet[randomIndex];
    }
  
    return res.status(200).json({
      success: true,
      password
    });
  };
  