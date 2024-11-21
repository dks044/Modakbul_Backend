import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_KEY,
        },
      },
      defaults: {
        from: `"SnapNow" <${process.env.GMAIL_USER}>`,
      },
    }),
  ],
  providers: [MailService],
})
export class MailModule {}
