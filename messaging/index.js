const express = require("express");
const router = express.Router();
const sendTextRouter = require("./send-text");

router.use("/send-text", sendTextRouter);

module.exports = router;
