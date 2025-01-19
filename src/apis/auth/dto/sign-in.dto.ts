import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import ValidationConstant from '@/constants/validation.constant';

export class SignInDto {
  @IsNotEmpty({
    message: ValidationConstant.EMAIL_ISNOTEMPTY,
  })
  @IsEmail(
    {},
    {
      message: ValidationConstant.EMAIL_ISEMAIL,
    },
  )
  @Length(
    ValidationConstant.EMAIL_MIN_LENGTH,
    ValidationConstant.EMAIL_MAX_LENGTH,
    {
      message: ValidationConstant.EMAIL_MESSAGE,
    },
  )
  email?: string;

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
