export interface UploadFile {
  statusCode: number;
  message: string;
  data: {
    path: string;
  };
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

export enum BucketType {
  IMAGE = 'images',
  VIDEO = 'videos',
  AUDIO = 'audios',
  DOCUMENT = 'documents',
  FILE = 'files',
}
