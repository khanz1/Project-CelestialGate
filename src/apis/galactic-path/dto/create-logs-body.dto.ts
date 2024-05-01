import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLogBodyDto {
  @IsNotEmpty()
  @IsNumber()
  redirectId: number;

  @IsNotEmpty()
  @IsString()
  ipAddress: string;

  @IsNotEmpty()
  @IsString()
  query: string;

  @IsNotEmpty()
  @IsString()
  userAgent: string;

  @IsNotEmpty()
  @IsString()
  data: string;
}
