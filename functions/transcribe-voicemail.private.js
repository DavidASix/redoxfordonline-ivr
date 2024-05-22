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
  try {
    const transcriptionText = event.TranscriptionText;
    const message = `New voicemail from ${event.From}: ${transcriptionText}`;
    await sendText(context, context.MY_PHONE_NUMBER, message);
    callback(null, {});
  } catch (error) {
    console.error("Error handling transcription:", error);
    callback(error);
  }
};