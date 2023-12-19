import {
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Controller,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AstralArchiveService } from './astral-archive.service';
import { UploadBodyDto } from './dto/upload-body.dto';

@Controller('astral-archive')
export class AstralArchiveController {
  constructor(private readonly astralArchiveService: AstralArchiveService) {}

  @Post('images')
  @UseInterceptors(FileInterceptor('image'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() { path }: UploadBodyDto,
  ) {
    return this.astralArchiveService.uploadFile({
      file,
      directoryPath: path,
    });
  }
}
