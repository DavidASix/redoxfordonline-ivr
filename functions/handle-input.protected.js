function sendText(context, to, message) {
  // Get the Twilio client
  const client = context.getTwilioClient();

  // Create and send a new message
  client.messages
    .create({
      body: message,
      from: context.TWILIO_PHONE_NUMBER,
      to: to,
    })
    .then((message) => console.log(`Sent message ${message.sid}`))
    .done();
};

exports.handler = function (context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  const digit = event.Digits;

  switch (digit) {
    case '1':
      console.log('Sending text...');
      sendText(context, event.From, 'Hello from The Company! This is our dummy information.');
      twiml.say({ voice: 'alice' }, 'Thank you for your request. You will receive a text message shortly.');
      break;
    case '2':
      console.log('Recording message...');
      twiml.say({ voice: 'alice' }, 'Please leave a message after the beep.');
      break;
    case '3':
      console.log('Connecting caller to owner...');
      sendText(context, context.MY_PHONE_NUMBER, `Incoming call from ${event.From}. Please standby.`);
      twiml.say({ voice: 'alice' }, 'Connecting you to the owner. Please hold.');
      twiml.pause({ length: 2 });
      twiml.dial(context.MY_PHONE_NUMBER);
      break;
    default:
      console.log('Invalid input.');
      twiml.say({ voice: 'alice' }, 'Invalid input. Please try again.');
      twiml.redirect('voice-ivr');
  }

  twiml.hangup();
  callback(null, twiml);
};