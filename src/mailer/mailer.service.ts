import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  async sendMail({
    from = '"Fred Foo 👻" <foo@example.com>',
    to = 'bar@example.com, baz@example.com',
    subject = 'Hello',
    html,
  }) {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: +process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    return {
      message: 'Mail sent: ',
    };
  }
}
