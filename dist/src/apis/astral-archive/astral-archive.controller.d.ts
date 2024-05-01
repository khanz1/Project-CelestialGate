/// <reference types="multer" />
import { AstralArchiveService } from './astral-archive.service';
import { UploadBodyDto } from './dto/upload-body.dto';
import { AuthRequest } from 'src/app.interface';
export declare class AstralArchiveController {
    private readonly astralArchiveService;
    constructor(astralArchiveService: AstralArchiveService);
    getFiles(req: AuthRequest): Promise<{
        statusCode: number;
        message: string;
        totalData: number;
        data: import("./models/owned-files.model").OwnedFile[];
    }>;
    upload(file: Express.Multer.File, { path }: UploadBodyDto, req: AuthRequest): Promise<{
        statusCode: number;
        message: string;
        data: {
            fileUrl: string;
            publicUrl: string;
        };
    }>;
}
