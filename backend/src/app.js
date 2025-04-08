const express = require('express');
const cors = require('cors');

const toolRoutes = require('./routes/tools.routes');
const fileUpload = require('express-fileupload');


const app = express();
const authRoutes = require('./routes/auth.routes');
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);


// Base API route
app.use('/api/tools', toolRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('🛠️ Toolify Backend is Live!');
});
 
app.use(fileUpload());
module.exports = app;
