"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AstralArchiveService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstralArchiveService = void 0;
const common_1 = require("@nestjs/common");
const astral_archive_interface_1 = require("./astral-archive.interface");
const Crypto = __importStar(require("crypto"));
const config_1 = require("@nestjs/config");
const supabase_js_1 = require("@supabase/supabase-js");
const file_type_1 = require("file-type");
const owned_files_model_1 = require("./models/owned-files.model");
const sequelize_1 = require("@nestjs/sequelize");
let AstralArchiveService = AstralArchiveService_1 = class AstralArchiveService {
    constructor(configService, ownedFileModel) {
        this.configService = configService;
        this.ownedFileModel = ownedFileModel;
        this.logger = new common_1.Logger(AstralArchiveService_1.name);
        const SUPABASE_URL = this.configService.get('SUPABASE_URL');
        const SUPABASE_KEY = this.configService.get('SUPABASE_KEY');
        this.SERVICE_URL = this.configService.get('STORAGE_SERVER_URL');
        this.supabase = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_KEY);
    }
    async uploadFile({ directoryPath, file, }) {
        const directories = directoryPath ? directoryPath + '/' : '/';
        this.logger.log(`filename: ${file.originalname}. size: ${file.size}`);
        const fileType = await this.getFileType(file);
        const sixMB = 6 * 1024 * 1024;
        if (file.size > sixMB) {
            throw new common_1.BadRequestException('File size is too large, max 6MB');
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
        const uploadError = error;
        if (uploadError && uploadError.statusCode === '404') {
            this.logger.log(`bucket ${fileType} not found, creating...`);
            await this.createSupabaseBucket(fileType);
            return this.uploadFile({
                file,
                directoryPath,
            });
        }
        const { data: { publicUrl }, } = this.supabase.storage.from(fileType).getPublicUrl(fullFileName);
        return {
            path: `${this.SERVICE_URL}/${fileType}/${data.path}`,
            publicUrl,
            fileName: finalFileName,
            fileType: fileType,
        };
    }
    async createSupabaseBucket(bucketName) {
        const { data, error } = await this.supabase.storage.createBucket(bucketName, {
            public: true,
        });
        if (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
        return data;
    }
    async getFileType(file) {
        const fileType = await (0, file_type_1.fromBuffer)(file.buffer);
        if (fileType.mime.match(/image/gi)) {
            return astral_archive_interface_1.BucketType.IMAGE;
        }
        else if (fileType.mime.match(/video/gi)) {
            return astral_archive_interface_1.BucketType.VIDEO;
        }
        else if (fileType.mime.match(/audio/gi)) {
            return astral_archive_interface_1.BucketType.AUDIO;
        }
        else if (fileType.mime.match(/document/gi)) {
            return astral_archive_interface_1.BucketType.DOCUMENT;
        }
        else {
            return astral_archive_interface_1.BucketType.FILE;
        }
    }
    async createOwnedFile(data) {
        return this.ownedFileModel.create({
            userId: data.userId,
            fileName: data.fileName,
            fileUrl: data.fileUrl,
            fileType: data.fileType,
            publicFileUrl: data.publicFileUrl,
        });
    }
    async getFileList(userId) {
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
};
exports.AstralArchiveService = AstralArchiveService;
exports.AstralArchiveService = AstralArchiveService = AstralArchiveService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, sequelize_1.InjectModel)(owned_files_model_1.OwnedFile)),
    __metadata("design:paramtypes", [config_1.ConfigService, Object])
], AstralArchiveService);
//# sourceMappingURL=astral-archive.service.js.map