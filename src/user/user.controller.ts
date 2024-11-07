import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signup(@Body() body: { email: string; name: string; password: string }) {
    return this.userService.create(body.email, body.name, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<User | null> {
    const user = await this.userService.findUserByEmailAndPassword(body.email, body.password);

    if (!user) {
      throw new HttpException('Invalid account', HttpStatus.UNAUTHORIZED);
    }

    return user; // 로그인 성공 시 사용자 정보를 반환
  }
}
