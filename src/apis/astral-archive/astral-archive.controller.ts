import {
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Controller,
  UseGuards,
  BadRequestException,
  Req,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AstralArchiveService } from './astral-archive.service';
import { UploadBodyDto } from './dto/upload-body.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthRequest } from '@/app.interface';
import { Express } from 'express';

@UseGuards(AuthGuard)
@Controller('astral-archive')
export class AstralArchiveController {
  constructor(private readonly astralArchiveService: AstralArchiveService) {}

  @Get('files')
  async getFiles(@Req() req: AuthRequest) {
    const { count, rows } = await this.astralArchiveService.getFileList(
      req.user.id,
    );

    return {
      statusCode: 200,
      message: 'Files fetched successfully',
      totalData: count,
      data: rows,
    };
  }

  @Post('upload/single')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() { path }: UploadBodyDto,
    @Req() req: AuthRequest,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const uploadedFile = await this.astralArchiveService.uploadFile({
      file,
      directoryPath: path,
    });

    await this.astralArchiveService.createOwnedFile({
      userId: req.user.id,
      fileName: uploadedFile.fileName,
      publicFileUrl: uploadedFile.publicUrl,
      fileUrl: uploadedFile.path,
      fileType: uploadedFile.fileType,
    });

    return {
      statusCode: 200,
      message: 'File uploaded successfully',
      data: {
        fileUrl: uploadedFile.path,
        publicUrl: uploadedFile.publicUrl,
      },
    };
  }
}
