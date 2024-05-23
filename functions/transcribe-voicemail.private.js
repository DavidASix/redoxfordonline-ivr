async function sendTextNotification(context, to, body) {
  // Get the Twilio client
  const client = context.getTwilioClient();
  const from = context.TWILIO_PHONE_NUMBER;
  console.log({to, from, body})
  try {
    // Create and send a new message
    const message = await client.messages.create({ body, from, to });
    console.log(`Sent message ${message.sid}`);
  } catch (error) {
    console.error("Error sending text:", error);
  }
}

exports.handler = async function (context, event, callback) {
  try {
    console.log('in transcript recording')
    const transcriptionText = event.TranscriptionText
    console.log({transcriptionText})
    const message = `New voicemail from ${event.From}: ${transcriptionText}`;
    await sendTextNotification(context, context.MY_PHONE_NUMBER, message);
    callback(null, {});
  } catch (error) {
    console.error("Error handling transcription:", error);
    callback(error);
  }
};