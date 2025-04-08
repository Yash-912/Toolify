const axios = require('axios');
const dns = require('dns');
const ping = require('ping');

// IP Lookup using public IP API
exports.lookupIP = async (req, res) => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    const geo = await axios.get(`https://ipapi.co/${response.data.ip}/json/`);
    return res.status(200).json({ success: true, ip: response.data.ip, geo: geo.data });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'IP Lookup failed', error: err.message });
  }
};

// DNS Lookup
exports.dnsLookup = (req, res) => {
  const { domain } = req.query;
  if (!domain) return res.status(400).json({ success: false, message: 'Domain is required.' });

  dns.lookup(domain, (err, address, family) => {
    if (err) return res.status(500).json({ success: false, message: 'DNS Lookup failed.', error: err.message });
    return res.status(200).json({ success: true, address, family });
  });
};

// Ping a host
exports.pingHost = async (req, res) => {
  const { host } = req.query;
  if (!host) return res.status(400).json({ success: false, message: 'Host is required.' });

  try {
    const result = await ping.promise.probe(host);
    return res.status(200).json({ success: true, result });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Ping failed.', error: err.message });
  }
};
