import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(5, 255, {
    message: 'Password must be at least 5 characters long',
  })
  password: string;
}
