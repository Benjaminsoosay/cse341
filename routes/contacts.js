const express = require('express');
const router = express.Router();
const { getAllContacts, getContactById } = require('../controllers/contacts');

router.get('/', getAllContacts);
router.get('/:id', getContactById);

module.exports = router;
