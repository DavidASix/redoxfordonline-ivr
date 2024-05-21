exports.handler = async function (context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();
    twiml.say({ voice: 'Polly.Joey' }, "Unfortunately nobody is available right now, please leave a message.");
    callback(null, twiml);
  };