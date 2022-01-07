import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from "../models/IMailProvider";

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    // Generate SMTP service account from ethereal.email
    nodemailer.createTestAccount().then( account => {

      // Create a SMTP transporter object
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
      });

      this.client = transporter;

    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    let message = {
      from: 'Equipe GoBarber <equipe@gobarber.com>',
      to,
      subject: 'Recuperação de Senha',
      text: body,
  };
    const mail = await this.client.sendMail(message);

    console.log('Message send: %s', mail.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mail));
  }
}

export default EtherealMailProvider;

