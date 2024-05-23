const express = require('express');
const router = express.Router();
require('dotenv').config();

const ivrEntryRouter = require('./ivr-entry');
router.use('/ivr-entry', ivrEntryRouter);

const handleInputRouter = require('./handle-input');
router.use('/handle-input', handleInputRouter);

const whisperRouter = require('./whisper');
router.use('/whisper', whisperRouter);

const handleCallNotAnsweredRouter = require('./handle-call-not-answered');
router.use('/handle-call-not-answered', handleCallNotAnsweredRouter);

module.exports = router;