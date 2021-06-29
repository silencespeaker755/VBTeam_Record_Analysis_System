import crypto from "crypto";

console.log(crypto.randomBytes(4).toString("hex"));

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "ntucsievolley777@gmail.com",
//     pass: "ntucsie777",
//   },
// });

// const mailOptions = {
//   from: "ntucsievolley777@gmail.com",
//   to: "nomofika@gmail.com",
//   subject: "Sending Email using Node.js",
//   text: "乾乾乾乾乾我被扣4分",
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(`Email sent: ${info.response}`);
//   }
// });
