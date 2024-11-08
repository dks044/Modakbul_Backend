import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { RedisService } from 'src/redis/redis.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // 비밀 키
      signOptions: { expiresIn: '30m' }, // 액세스 토큰 만료 시간
    }),
  ],
  providers: [UserService, AuthService, JwtStrategy, PrismaService, RedisService],
  controllers: [AuthController],
})
export class AuthModule {}
