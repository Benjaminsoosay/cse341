const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.get('/seed', async (req, res) => {
  try {
    const Contact = require('./models/contact'); // Make sure this file exists: models/contact.js
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
    res.status(500).send('Seeding failed: ' + err.message);
  }
});


console.log('MongoDB URI:', process.env.MONGODB_URI);


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Database is connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


const contactsRoutes = require('./routes/contacts'); // Make sure this file exists: routes/contacts.js
app.use('/contacts', contactsRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
