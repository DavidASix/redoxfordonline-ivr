const express = require('express');
const axios = require('axios');
const router = express.Router();
const Twilio = require('twilio');
require("dotenv").config();

const domain = process.env.DOMAIN;

router.post('/', async (req, res) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  const voice = "Polly.Joey";
  const digit = req.body.Digits;

  try {
    switch (digit) {
      case "1":
        try {
          twiml.say({ voice }, "Sending you a text, please wait.");
          const body = 
          "" +
          "Hello from Red Oxford Online!\n" +
          "We create high quality websites that your clients will love.\n\n" +
          "Red Oxford Online is based in Waterloo Ontario, but we work with clients across North America. We're available 10AM and 6PM EDT, Monday - Friday.\n\n" +
          "Our services: \n"+
          "👉️ Website design\n"+
          "👉️ Server & Backened Development\n"+
          "👉️ Web Hosting\n"+
          "👉️ Custom Domain Email\n"+
          "👉️ Google Ad Campaigns & SEO\n\n"+ 
          "We offer flexible payment options for new sites and site redesigns, with options starting at $0!\n\n" +
          "Want to know more? Check out our website at redoxfordonline.com!\n"+
          "Thanks for reaching out, we hope to hear from you soon!";
          await axios.post(`${domain}/messaging/send-text`, {
            to: req.body.From,
            body,
          });
          twiml.say({ voice }, "The text has been sent.");
        } catch (err) {
          console.log(err);
          twiml.say({ voice }, "Sorry, an error occured");
        } finally {
          twiml.say({ voice }, "Thank you for your call, goodbye.");
          twiml.hangup();
        }
        break;
      case "2":
        console.log("Recording message...");
        twiml.say({ voice }, "Please leave a message with your name, phone number, and reason for your call.");
        twiml.say({ voice }, "We will get back to you as soon as possible.");
        twiml.record({
          maxLength: 30,
          transcribe: true,
          transcribeCallback: 'transcribe-voicemail',
          playBeep: true,
          action: 'call-complete',
        });
        break;
      case "3":
        twiml.say({ voice }, "Connecting you to the owner. Please hold.");
        twiml.dial({
          timeout: 15,
          action: 'handle-call-not-answered',
        }).number({
          url: '/whisper',
        }, process.env.MY_PHONE_NUMBER);
        break;
      default:
        console.log("Invalid input.");
        twiml.say({ voice }, "Sorry that's not an option, please try again.");
        twiml.redirect("voice-ivr");
    }
    res.set("Content-Type", "text/xml");
    res.send(twiml.toString());
  } catch (error) {
    console.error("Error handling input:", error);
    res.status(500).send("Error handling input");
  }
});

module.exports = router;