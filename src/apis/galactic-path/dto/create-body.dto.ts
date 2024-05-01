import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateBodyDto {
  @IsNotEmpty()
  @IsString()
  fromUrl: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  toUrl: string;
}
