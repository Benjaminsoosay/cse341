const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cse341');

const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB via Mongoose');
});

module.exports = mongoose;



