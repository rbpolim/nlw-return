import nodemailer from 'nodemailer'

import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",  
  port: 2525,
  auth: {
    user: "4889808025002a",
    pass: "baea725e3c98f1"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Equipe <equipe@email.com>',
      subject,
      html: body
    });
  }
};