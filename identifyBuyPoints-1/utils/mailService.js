const nodemailer = require("nodemailer");
require('dotenv').config();

exports.sendMail = async (symbol, redCandlesCount) => {
  try {
    const message = `Buy ${symbol} now! It has witnessed ${redCandlesCount} continuous red hourly candles.`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "malikdinarss7@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "malik@gmail.com",
      to: "malikdinaras@gmail.com",
      subject: `${symbol} Buy Alert`,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error(error);
  }
};
