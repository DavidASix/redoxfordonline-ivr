async function sendText(context, to, body) {
  // Get the Twilio client
  const client = context.getTwilioClient();
  const from = context.TWILIO_PHONE_NUMBER;

  try {
    // Create and send a new message
    const message = await client.messages.create({ body, from, to });
    console.log(`Sent message ${message.sid}`);
  } catch (error) {
    console.error("Error sending text:", error);
  }
}

exports.handler = async function (context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  const voice = "Polly.Joey";
  const digit = event.Digits;
  try {
    switch (digit) {
      case "1":
        console.log("Sending text...");
        const message =
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
        await sendText(context, event.From, message);
        twiml.say(
          { voice },
          "You will receive a text message shortly. Thank you for calling us today, goodbye!"
        );
        twiml.hangup();
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
        }, context.MY_PHONE_NUMBER);
        break;
      default:
        console.log("Invalid input.");
        twiml.say({ voice }, "Sorry that's not an option, please try again.");
        twiml.redirect("voice-ivr");
    }
    callback(null, twiml);
  } catch (error) {
    console.error("Error handling input:", error);
    callback(error);
  }
};