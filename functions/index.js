const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

exports.sendContactMessage = functions.database.ref("/messages/{pushKey}")
    .onWrite((event) => {
      const snapshot = event.data;
      if (snapshot.previous.val() || !snapshot.val().name) {
        return;
      }

      const val = snapshot.val();

      const mailOptions = {
        to: "horvath.vilmos22@gmail.com",
        subject: `Information Request from ${val.name}`,
        html: val.html,
      };

      return mailTransport.sendMail(mailOptions)
          .then(() => {
            return console.log("Mail sent");
          });
    });
