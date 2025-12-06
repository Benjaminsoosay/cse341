const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the CSE341 API',
    endpoints: {
      contacts: '/contacts',
      apiDocs: '/api-docs'
    }
  });
});

module.exports = router;
