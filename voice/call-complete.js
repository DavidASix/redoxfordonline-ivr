const express = require("express");
const router = express.Router();
const Twilio = require("twilio");

router.post("/", async (req, res) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  twiml.hangup();
  res.type("text/xml");
  res.send(twiml.toString());
});

module.exports = router;
