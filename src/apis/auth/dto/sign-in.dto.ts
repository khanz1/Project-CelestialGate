import { IsEmail, IsNotEmpty, Length, IsOptional } from 'class-validator';

export class SignInDto {
  @IsOptional()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(5, 255, {
    message: 'Password must be at least 5 characters long',
  })
  password: string;
}
