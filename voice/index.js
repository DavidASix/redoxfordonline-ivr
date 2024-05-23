const express = require('express');
const router = express.Router();
require('dotenv').config();

const ivrEntryRouter = require('./ivr-entry');
router.use('/ivr-entry', ivrEntryRouter);

const handleInputRouter = require('./handle-input');
router.use('/handle-input', handleInputRouter);

module.exports = router;