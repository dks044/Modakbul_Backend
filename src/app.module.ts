import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RedisService } from './redis/redis.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, MailerModule, MailModule],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule {}
