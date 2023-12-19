import { IsNotEmpty, IsString } from 'class-validator';

export class UploadBodyDto {
  @IsNotEmpty()
  @IsString()
  path: string;
}
