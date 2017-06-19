import * as nodemailer from "nodemailer";
import * as config from 'config';

export default class EmailHelper {
  static sendEmail(toAddress: string, subject: string, text: string, html?: string) {
    return new Promise((resolve, reject) => {

      let transporter = nodemailer.createTransport(config.get("email.smtp_config"));

      let mailOptions = {
        from: `"${config.get("email.from_name")}" <${config.get("email.from_address")}>`,
        to: toAddress,
        subject: subject,
        text: text,
        html: html ? html : text
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
