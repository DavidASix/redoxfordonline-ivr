const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const domain = process.env.DOMAIN;

router.post('/', async (req, res) => {
  try {
    console.log('in transcript recording')
    const transcriptionText = req.body.TranscriptionText
    console.log({transcriptionText})
    const message = `New voicemail from ${req.body.From}: ${transcriptionText}`;
    await axios.post(`${domain}/messaging/send-text`, {
      to: process.env.MY_PHONE_NUMBER,
      body: message
    });
    res.send({});
  } catch (error) {
    console.error("Error handling transcription:", error);
    res.status(500).send("Error handling transcription");
  }
});

module.exports = router;