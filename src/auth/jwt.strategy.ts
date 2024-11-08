import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

//JWT 전략 정의
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //jwtFromRequest: 요청 헤더에서 Bearer 토큰을 추출
      ignoreExpiration: false, //ignoreExpiration: 만료된 토큰을 무시하지 않도록 설정
      secretOrKey: process.env.JWT_SECRET, // 비밀 키
    });
  }

  //JWT의 페이로드를 검증하는 메서드
  async validate(payload: any) {
    return this.userService.findUserByEmailAndPassword(payload.email, payload.sub);
  }
}
