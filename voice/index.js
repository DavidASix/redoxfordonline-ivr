const express = require('express');
const router = express.Router();
const Twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

router.post('/', (req, res) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const voice = "Polly.Joey";

  // twiml.say({ voice }, "Thanks for calling Red Oxford Online.");
  // twiml.pause({ length: 1 });
  // twiml.say(
  //   { voice },
  //   "Improve your client communication today with a truly custom web site."
  // );
  // twiml.pause({ length: 1 });
  // twiml.say({ voice }, "Please listen to the following options");

  const gather = twiml.gather({
    numDigits: 1,
    action: "/voice/handle-input",
    method: "POST",
  });

  gather.say({voice}, "Press 1 to receive a text with our business information");
  gather.say({voice}, "Press 2 to leave a message, which we'll respond to within 24 hours");
  gather.say({voice}, "Press 3 to speak with the owner");

  res.set("Content-Type", "text/xml");
  res.send(twiml.toString());
});

router.post('/handle-input', (req, res) => {
  const digits = req.body.Digits;
  // Handle the user's input based on the value of 'digits'
  // ...

  const twiml = new Twilio.twiml.VoiceResponse();
  // Generate the appropriate TwiML response based on the user's input
  // ...

  res.set("Content-Type", "text/xml");
  res.send(twiml.toString());
});

module.exports = router;