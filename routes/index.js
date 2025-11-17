const express = require('express');
const router = express.Router();

router.use('/api-docs', require('./swagger')); // ✅ Swagger UI

const userRoutes = require('./users');
const productRoutes = require('./products');

router.get('/', (req, res) => {
  res.send('🚀 Welcome to your CSE341 API!');
});

router.use('/users', userRoutes);
router.use('/products', productRoutes);

module.exports = router;

