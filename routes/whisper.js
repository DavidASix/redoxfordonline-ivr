exports.handler = async function (context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();
    twiml.say({ voice: 'Polly.Joey' }, 'Red Oxford Online! Please respond accordingly');
    callback(null, twiml);
  };