import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import ValidationConstant from '@/constants/validation.constant';

export class SignUpDto {
  @IsNotEmpty({
    message: ValidationConstant.USERNAME_ISNOTEMPTY,
  })
  @Length(
    ValidationConstant.USERNAME_MIN_LENGTH,
    ValidationConstant.USERNAME_MAX_LENGTH,
    {
      message: ValidationConstant.USERNAME_MESSAGE,
    },
  )
  username: string;

  @IsNotEmpty({
    message: ValidationConstant.EMAIL_ISNOTEMPTY,
  })
  @IsEmail({}, {
    message: ValidationConstant.EMAIL_ISEMAIL,
  })
  @Length(
    ValidationConstant.EMAIL_MIN_LENGTH,
    ValidationConstant.EMAIL_MAX_LENGTH,
    {
      message: ValidationConstant.EMAIL_MESSAGE,
    },
  )
  email: string;

  @IsNotEmpty({
    message: ValidationConstant.PASSWORD_ISNOTEMPTY,
  })
  @Length(
    ValidationConstant.PASSWORD_MIN_LENGTH,
    ValidationConstant.PASSWORD_MAX_LENGTH,
    {
      message: ValidationConstant.PASSWORD_MESSAGE,
    },
  )
  password: string;
}
