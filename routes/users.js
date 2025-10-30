const express = require('express');
const router = express.Router();

// Sample user data
const user = {
  _id: '6902195220b0250761ae194d',
  name: 'Benjamin Senase',
  email: 'iwuchukwubenjaminsoosay@gmail.com',
  username: 'iwuchukwubenjaminsoosay_db_user',
  about: 'Full-stack developer passionate about clean, scalable web apps.',
  skills: ['JavaScript', 'Node.js', 'React', 'MongoDB']
};

// Route to return user data
router.get('/', (req, res) => {
  res.json(user);
});

module.exports = router;




