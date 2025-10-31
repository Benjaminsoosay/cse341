require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Log the database name once the connection is open
mongoose.connection.once('open', () => {
  console.log('Using database:', mongoose.connection.name);
});

// Contact model
const Contact = require('./models/contact');

// Route: Get all contacts
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route: Get all contacts with /project1 prefix
app.get('/project1/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route: Only allow Benjamin's contact by ID
app.get('/contacts/:id', async (req, res) => {
  const allowedId = '6903178017d1674f85775787';

  if (req.params.id !== allowedId) {
    return res.status(403).json({ message: 'Access denied: contact not allowed' });
  }

  try {
    const contact = await Contact.findById(allowedId);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
