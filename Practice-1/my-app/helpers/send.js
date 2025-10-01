const nodemailer = require("nodemailer");
require("dotenv").config()


async function sendMail(mail,token) {
  // transport object
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,   // քո gmail
      pass: process.env.EMAIL_PASS    // App password (ոչ թե իրական password)
    }
  });

  // նամակի պարամետրեր
  const info = await transporter.sendMail({
    from: `"My App" <${process.env.EMAIL_USER}>`,
    to: mail, 
    subject: "Verify account",
    html:  `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Account</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #4f46e5; color: white;">
        <h1>My App</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px; text-align: center;">
        <h2 style="color: #333;">Verify Your Account</h2>
        <p style="color: #555;">Hi there! Click the button below to verify your email address and activate your account.</p>
        <a href="${process.env.HOST}verify/${token}" 
           style="display: inline-block; margin: 20px 0; padding: 12px 24px; color: white; background-color: #4f46e5; border-radius: 6px; text-decoration: none; font-weight: bold;">
           Verify Account
        </a>
        <p style="color: #888; font-size: 12px;">If you did not request this, you can safely ignore this email.</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 15px; text-align: center; font-size: 12px; color: #aaa;">
        &copy; 2025 My App. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
`,
  });

  console.log(`Message sent:  ${info.messageId}`);
}


module.exports = sendMail