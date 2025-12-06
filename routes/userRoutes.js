const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }]);
});

router.get('/:id', (req, res) => {
  res.json({ id: req.params.id, name: `User ${req.params.id}` });
});

router.post('/', (req, res, next) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      throw new Error('Validation: Name and email required');
    }
    
    res.status(201).json({ 
      message: 'User created', 
      user: { id: Date.now(), name, email } 
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    const { name, email } = req.body;
    
    if (!name && !email) {
      throw new Error('Validation: At least one field required');
    }
    
    res.json({ 
      message: 'User updated', 
      user: { id: req.params.id, name, email } 
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req, res) => {
  res.json({ message: `User ${req.params.id} deleted` });
});

module.exports = router;