exports.handler = async function (context, event, callback) {
    const twiml = new Twilio.twiml.VoiceResponse();
    twiml.say({ voice: 'Polly.Joey' }, 'Red Oxford Online! This is a business call, please respond accordingly');
    callback(null, twiml);
  };