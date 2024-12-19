import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

// mail.service.ts
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(email: string, emailCode: string) {
    await this.mailerService
      .sendMail({
        to: email,
        subject: '[MODAKBUL] 회원님의 인증번호 입니다.',
        text: emailCode,
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
