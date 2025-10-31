require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('MongoDB connection error:', err));

mongoose.connection.once('open', () => {
  console.log('Using database:', mongoose.connection.name);
});

// Contact model
const Contact = require('./models/contact');

// Route: Seed contacts
app.get('/seed', async (req, res) => {
  try {
    const count = await Contact.countDocuments();

    if (count === 0) {
      await Contact.insertMany([
        {
          firstName: 'Alice',
          lastName: 'Johnson',
          email: 'alice@example.com',
          favoriteColor: 'Blue',
          birthday: '1990-01-01'
        },
        {
          firstName: 'Bob',
          lastName: 'Smith',
          email: 'bob@example.com',
          favoriteColor: 'Green',
          birthday: '1985-05-15'
        },
        {
          firstName: 'Carol',
          lastName: 'Lee',
          email: 'carol@example.com',
          favoriteColor: 'Red',
          birthday: '1992-09-30'
        },
        {
          firstName: 'Benjamin',
          lastName: 'Senase',
          email: 'iwuchukwubenjaminsoosay@gmail.com',
          favoriteColor: 'Red',
          birthday: '1984-02-12'
        }
      ]);
      res.send('Seeded!');
    } else {
      res.send('Already seeded.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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

// Root route
app.get('/', (req, res) => {
  res.send('Contacts API is running');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

