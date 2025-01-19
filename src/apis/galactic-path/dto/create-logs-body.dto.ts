import ValidationConstant from '@/constants/validation.constant';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLogBodyDto {
  @IsNotEmpty({
    message: ValidationConstant.REDIRECT_ID_ISNOTEMPTY,
  })
  @IsNumber(
    {},
    {
      message: ValidationConstant.REDIRECT_ID_ISNUMBER,
    },
  )
  @Transform(({ value }) => Number(value))
  redirectId: number;

  @IsNotEmpty()
  @IsString()
  ipAddress: string;

  @IsOptional()
  @IsString()
  query: string;

  @IsNotEmpty()
  @IsString()
  userAgent: string;

  @IsOptional()
  @IsString()
  data: string;
}
