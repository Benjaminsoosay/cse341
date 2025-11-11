const express = require('express');
const router = express.Router();

// Swagger documentation route
router.use('/api-docs', require('./swagger'));

// Root route
router.get('/', (req, res) => {
  // #swagger.tags = ['Hello World']
  res.send('Hello World');
});

// Users route
router.use('/users', require('./users'));

module.exports = router;
