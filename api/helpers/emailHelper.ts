import * as nodemailer from "nodemailer";

export default class EmailHelper {
  static sendEmail(toAddress: string, subject: string, text: string, html?: string) {
    return new Promise((resolve, reject) => {
      let config = require('../config.json');
      let transporter = nodemailer.createTransport(config.email.smtpConfig);

      let mailOptions = {
        from: `"${config.email.emailFromName}" <${config.email.emailFromAddress}>`,
        to: toAddress,
        subject: subject,
        text: text,
        html: html
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        }

        resolve(info);
      });
    });

  }
}
