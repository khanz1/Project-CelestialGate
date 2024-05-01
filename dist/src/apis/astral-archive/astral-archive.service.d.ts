/// <reference types="multer" />
import { UploadFile, UploadFileProps, BucketType, CreateOwnedFileProps } from './astral-archive.interface';
import { ConfigService } from '@nestjs/config';
import { OwnedFile } from './models/owned-files.model';
export declare class AstralArchiveService {
    private configService;
    private readonly ownedFileModel;
    private supabase;
    private readonly SERVICE_URL;
    private readonly logger;
    constructor(configService: ConfigService, ownedFileModel: typeof OwnedFile);
    uploadFile({ directoryPath, file, }: UploadFileProps): Promise<UploadFile>;
    createSupabaseBucket(bucketName: string): Promise<Pick<import("@supabase/storage-js").Bucket, "name">>;
    getFileType(file: Express.Multer.File): Promise<BucketType>;
    createOwnedFile(data: CreateOwnedFileProps): Promise<OwnedFile>;
    getFileList(userId: number): Promise<{
        rows: OwnedFile[];
        count: number;
    }>;
}
