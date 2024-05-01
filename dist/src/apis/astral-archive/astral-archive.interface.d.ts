/// <reference types="multer" />
export interface UploadFile {
    path: string;
    publicUrl: string;
    fileName: string;
    fileType: BucketType;
}
export interface UploadFileProps {
    file: Express.Multer.File;
    directoryPath: string;
}
export interface ErrorUploadFile {
    statusCode: string;
    message: string;
    error: string;
    bucketName: string;
}
export interface SupabaseStorageError {
    statusCode: string;
    message: string;
    error: string;
}
export declare enum BucketType {
    IMAGE = "images",
    VIDEO = "videos",
    AUDIO = "audios",
    DOCUMENT = "documents",
    FILE = "files"
}
export interface CreateOwnedFileProps {
    userId: number;
    fileName: string;
    publicFileUrl: string;
    fileUrl: string;
    fileType: BucketType;
}
