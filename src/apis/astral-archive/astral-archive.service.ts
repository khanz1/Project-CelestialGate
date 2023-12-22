import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  UploadFile,
  UploadFileProps,
  SupabaseStorageError,
  BucketType,
  CreateOwnedFileProps,
} from './astral-archive.interface';
import * as Crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { fromBuffer } from 'file-type';
import { OwnedFile } from './models/owned-files.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AstralArchiveService {
  private supabase: SupabaseClient;
  private readonly SERVICE_URL: string;
  private readonly logger = new Logger(AstralArchiveService.name);

  constructor(
    private configService: ConfigService,
    @InjectModel(OwnedFile) private readonly ownedFileModel: typeof OwnedFile,
  ) {
    const SUPABASE_URL = this.configService.get<string>('SUPABASE_URL');
    const SUPABASE_KEY = this.configService.get<string>('SUPABASE_KEY');
    this.SERVICE_URL = this.configService.get<string>('STORAGE_SERVER_URL');

    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  async uploadFile({
    directoryPath,
    file,
  }: UploadFileProps): Promise<UploadFile> {
    const directories = directoryPath ? directoryPath + '/' : '/';
    this.logger.log(`filename: ${file.originalname}. size: ${file.size}`);

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
    const finalFileName = `${safeFileName}-${id}.${extension.toLowerCase()}`;
    const fullFileName = `${directories}${finalFileName}`;

    this.logger.log('uploading...');
    const { data, error } = await this.supabase.storage
      .from(fileType)
      .upload(fullFileName, file.buffer, {
        upsert: true,
      });

    const uploadError = error as unknown as SupabaseStorageError;

    if (uploadError && uploadError.statusCode === '404') {
      this.logger.log(`bucket ${fileType} not found, creating...`);
      await this.createSupabaseBucket(fileType);
      return this.uploadFile({
        file,
        directoryPath,
      });
    }

    const {
      data: { publicUrl },
    } = this.supabase.storage.from(fileType).getPublicUrl(fullFileName);

    return {
      path: `${this.SERVICE_URL}/${fileType}/${data.path}`,
      publicUrl,
      fileName: finalFileName,
      fileType: fileType,
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

  async createOwnedFile(data: CreateOwnedFileProps) {
    return this.ownedFileModel.create({
      userId: data.userId,
      fileName: data.fileName,
      fileUrl: data.fileUrl,
      fileType: data.fileType,
      publicFileUrl: data.publicFileUrl,
    });
  }

  async getFileList(userId: number) {
    return this.ownedFileModel.findAndCountAll({
      attributes: [
        'id',
        'fileName',
        'fileUrl',
        'publicFileUrl',
        'fileType',
        'createdAt',
      ],
      where: {
        userId,
      },
    });
  }
}
