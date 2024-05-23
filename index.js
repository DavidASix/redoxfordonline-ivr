const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

const voiceRouter = require('./voice');
const messagingRouter = require('./messaging');

// Middleware
app.use(express.json());

// Routes
app.use('/voice', voiceRouter);
app.use('/messaging', messagingRouter);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});