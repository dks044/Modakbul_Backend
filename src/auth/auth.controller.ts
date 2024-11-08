import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // 회원가입
  @Post('register')
  async register(@Body() body: { email: string; name: string; password: string }) {
    // 회원가입 처리
    const user = await this.userService.create(body.email, body.name, body.password);

    console.log('회원가입 => ', user.email);
    // 자동 로그인 처리
    return await this.authService.login(body.email, body.password);
  }

  //로그인
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return await this.authService.login(body.email, body.password);
  }

  //리프래쉬 검증하여 액세스 할당
  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    return await this.authService.refresh(body.refreshToken);
  }
}
