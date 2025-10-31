const express = require('express');
const app = express();

// Import your contact route
const contactRoutes = require('./routes/contactRoutes');

// Use the route
app.use('/contacts', contactRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
