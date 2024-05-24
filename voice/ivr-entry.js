const express = require("express");
const router = express.Router();
const Twilio = require("twilio");
require("dotenv").config();

router.post("/", (req, res) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const voice = "Polly.Joey";

  twiml.say({ voice }, "Thanks for calling Red Oxford Online.");
  twiml.pause({ length: 1 });
  twiml.say(
    { voice },
    "Improve your client communication today with a truly custom web site."
  );
  twiml.pause({ length: 1 });
  twiml.say({ voice }, "Please listen to the following options");

  const gather = twiml.gather({
    numDigits: 1,
    action: "/voice/handle-input",
    method: "POST",
  });

  gather.say({ voice }, "Press 1 to receive a text with our business information");
  gather.say({ voice }, "Press 2 to leave a message, which we'll respond to within 24 hours");
  gather.say({ voice }, "Press 3 to speak with the owner");

  res.type("text/xml");
  res.send(twiml.toString());
});

module.exports = router;
