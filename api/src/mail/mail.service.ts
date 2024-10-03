import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EMAIL_SENDER } from 'src/consts';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService
  ) {}

  public sendMail(to: string, subject: string, html: string): any {
    return this.mailerService
      .sendMail({
        to: to,
        from: EMAIL_SENDER,
        subject: subject,
        html: html,
      })
      .then(() => {
        console.log('Email sent!');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
