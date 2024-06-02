import nodemailer from "nodemailer";

class EmailSender {
  static async sendEmail(to, subject, text) {
    let mailTransporter = nodemailer.createTransport({
      service: "Mail.ru",
      auth: {
        user: "info@inlot.kz",
        pass: "CiE4rYsvaKpTieW5MnsE",
      },
    });

    let mailDetails = {
      from: "info@inlot.kz",
      to: to,
      subject: subject,
      text: text,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs");
        console.log(err);
      } else {
        console.log("Email sent successfully");
      }
    });
  }
}

export default EmailSender;
