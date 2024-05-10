const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAIL_USERMAILER,
    pass: process.env.NODEMAIL_PASSMAILER,
  },
});

module.exports = { transport };
