import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  UploadFile,
  ErrorUploadFile,
  UploadFileProps,
  SupabaseStorageError,
  BucketType,
} from './astral-archive.interface';
import * as Crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Logger } from '@nestjs/common';
import { fromBuffer } from 'file-type';

@Injectable()
export class AstralArchiveService {
  private supabase: SupabaseClient;
  private readonly SERVICE_URL: string;
  private readonly logger = new Logger(AstralArchiveService.name);

  constructor(private configService: ConfigService) {
    const SUPABASE_URL = this.configService.get<string>('SUPABASE_URL');
    const SUPABASE_KEY = this.configService.get<string>('SUPABASE_KEY');
    this.SERVICE_URL = this.configService.get<string>('STORAGE_SERVER_URL');

    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  async uploadFile({
    directoryPath,
    file,
  }: UploadFileProps): Promise<UploadFile | ErrorUploadFile> {
    const directories = !!directoryPath ? directoryPath + '/' : '/';
    this.logger.log(`Filename: ${file.originalname}`);
    this.logger.log(`Uploading file to ${directories}`);

    const fileType = await this.getFileType(file);
    const sixMB = 6 * 1024 * 1024;

    if (file.size > sixMB) {
      throw new BadRequestException('File size is too large, max 6MB');
    }

    const id = Crypto.randomUUID();
    const splittedName = file.originalname.split('.');
    const fileName = splittedName.join('').slice(0, 25);
    const extension = splittedName[splittedName.length - 1];
    const safeFileName = fileName.replace(/\s/gi, '-').trim();
    const fullFileName = `${directories}${safeFileName}-${id}.${extension.toLowerCase()}`;

    const { data, error } = await this.supabase.storage
      .from(fileType)
      .upload(fullFileName, file.buffer, {
        upsert: true,
      });

    const uploadError = error as unknown as SupabaseStorageError;

    if (uploadError && uploadError.statusCode === '404') {
      await this.createSupabaseBucket(fileType);
      return this.uploadFile({
        file,
        directoryPath,
      });
    }

    return {
      statusCode: 200,
      message: 'File uploaded successfully',
      data: {
        path: `${this.SERVICE_URL}/images/${data.path}`,
      },
    };
  }

  async createSupabaseBucket(bucketName: string) {
    const { data, error } = await this.supabase.storage.createBucket(
      bucketName,
      {
        public: true,
      },
    );

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async getFileType(file: Express.Multer.File) {
    const fileType = await fromBuffer(file.buffer);
    if (fileType.mime.match(/image/gi)) {
      return BucketType.IMAGE;
    } else if (fileType.mime.match(/video/gi)) {
      return BucketType.VIDEO;
    } else if (fileType.mime.match(/audio/gi)) {
      return BucketType.AUDIO;
    } else if (fileType.mime.match(/document/gi)) {
      // coming later...
      return BucketType.DOCUMENT;
    } else {
      return BucketType.FILE;
    }
  }
}
