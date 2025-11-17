// routes/swagger.js
const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json'); // generated file in project root

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
