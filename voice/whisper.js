const express = require('express');
const router = express.Router();
const Twilio = require('twilio');

router.post('/', async (req, res) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  twiml.say({ voice: 'Polly.Joey' }, 'Red Oxford Online! Please respond accordingly');
  res.set("Content-Type", "text/xml");
  res.send(twiml.toString());
});

module.exports = router;