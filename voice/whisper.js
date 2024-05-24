const express = require("express");
const router = express.Router();
const Twilio = require("twilio");

router.post("/", async (req, res) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const voice = "Polly.Joey";
  twiml.say({ voice }, "Red Oxford Online! Please respond accordingly");
  res.type("text/xml");
  res.send(twiml.toString());
});

module.exports = router;
