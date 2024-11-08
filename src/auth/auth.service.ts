import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RedisService } from 'src/redis/redis.service';
import { UserInfoResponseDto } from 'src/user/dto/UserResponseDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findUserByEmailAndPassword(email, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({ email: user.email, sub: user.id });
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { expiresIn: '7d' }, //만료기간 7일
    );

    // Redis에 리프레시 토큰 저장
    await this.redisService.set(`refresh_token:${user.id}`, refreshToken, 7 * 24 * 60 * 60);

    const userInfo = new UserInfoResponseDto();
    userInfo.id = user.email;
    userInfo.email = user.email;
    userInfo.name = user.name;

    return {
      userInfo,
      accessToken,
      refreshToken,
    };
  }

  //리프레시 토큰을 사용하여 새로운 액세스 토큰을 생성하는 비동기 메서드
  async refresh(refreshToken: string) {
    //verify: 리프레시 토큰의 유효성을 검사하고, 페이로드를 추출
    const payload = this.jwtService.verify(refreshToken);
    const userId = payload.sub;

    const storedToken = await this.redisService.get(`refresh_token:${userId}`);
    if (storedToken !== refreshToken) {
      throw new Error('Invalid refresh token');
    }

    const accessToken = this.jwtService.sign({ email: payload.email, sub: userId });
    return { accessToken };
  }
}
