const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  lastName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] 
  },
  favoriteColor: { 
    type: String, 
    default: 'Blue' 
  },
  birthday: { 
    type: Date 
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
