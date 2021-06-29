import nodemailer from "nodemailer";
import moment from "moment";
import crypto from "crypto";
import config from "./config";
import Mail from "./models/Mail";

const sendMail = async (mailOptions) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email,
        pass: config.password,
      },
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`Error is ${error}`);
        resolve(false);
      } else {
        console.log(`Email sent: ${info.response}`);
        resolve(true);
      }
    });
  });
};

const sendVerification = async (userMail) => {
  const verification = crypto.randomBytes(4).toString("hex");

  const mailOptions = {
    from: config.email,
    to: userMail,
    subject: "Verification",
    text: `Verification Code: ${verification}`,
  };

  const expire = moment().add(20, "minutes").format("YYYY-MM-DD HH:mm:ss");

  const mail = new Mail({
    receiver: userMail,
    expire,
    verification,
  });

  await mail.save();
  console.log(mail);
  const emailRes = await sendMail(mailOptions);

  return emailRes;
};

export default sendVerification;
