const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]);
});

router.get('/:id', (req, res) => {
  res.json({ id: req.params.id, name: `Product ${req.params.id}` });
});

module.exports = router;