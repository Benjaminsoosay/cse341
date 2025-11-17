// server.js
require('dotenv').config(); // ✅ Load environment variables first

const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./data/database'); // MongoDB connection file
const routes = require('./routes');           // Index file that loads all route modules

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// CORS setup
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-key'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});

// Routes
app.use('/', routes);

// Connect DB and start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Database is connected. App running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
  });

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});
