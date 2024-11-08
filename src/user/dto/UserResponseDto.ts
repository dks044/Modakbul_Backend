import { IsEmail, IsString } from 'class-validator';

export class UserInfoResponseDto {
  @IsEmail()
  email: string;

  @IsString()
  id: string;

  @IsString()
  name: string;
}
