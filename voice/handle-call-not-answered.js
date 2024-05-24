const express = require("express");
const router = express.Router();
const Twilio = require("twilio");

router.post("/", async (req, res) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const callStatus = req.body.DialCallStatus;
  const voice = "Polly.Joey";
  if (
    callStatus === "no-answer" ||
    callStatus === "failed" ||
    callStatus === "busy"
  ) {
    twiml.say({ voice }, "Unfortunately nobody is available to take your call");
    twiml.say({ voice }, "Please leave a message and we will get back to you as soon as possible");

    twiml.record({
      maxLength: 30,
      transcribe: true,
      transcribeCallback: "transcribe-voicemail",
      playBeep: true,
      action: "call-complete",
    });
  }
  res.type("text/xml");
  res.send(twiml.toString());
});

module.exports = router;
