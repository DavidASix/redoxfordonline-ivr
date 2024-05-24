const express = require("express");
const router = express.Router();
const Twilio = require("twilio");
require("dotenv").config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

router.post("/", async (req, res) => {
  const to = req.body.to;
  const body = req.body.body;
  const from = process.env.TWILIO_PHONE_NUMBER;
  try {
    // Create and send a new message
    const message = await client.messages.create({ body, from, to });
    res.send(`Sent message ${message.sid}`);
  } catch (error) {
    console.error("Error sending text:", error);
    res.status(500).send("Error sending text");
  }
});

module.exports = router;
