"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstralArchiveController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const astral_archive_service_1 = require("./astral-archive.service");
const upload_body_dto_1 = require("./dto/upload-body.dto");
const auth_guard_1 = require("../auth/guards/auth.guard");
let AstralArchiveController = class AstralArchiveController {
    constructor(astralArchiveService) {
        this.astralArchiveService = astralArchiveService;
    }
    async getFiles(req) {
        const { count, rows } = await this.astralArchiveService.getFileList(req.user.id);
        return {
            statusCode: 200,
            message: 'Files fetched successfully',
            totalData: count,
            data: rows,
        };
    }
    async upload(file, { path }, req) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
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
};
exports.AstralArchiveController = AstralArchiveController;
__decorate([
    (0, common_1.Get)('files'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AstralArchiveController.prototype, "getFiles", null);
__decorate([
    (0, common_1.Post)('upload/single'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upload_body_dto_1.UploadBodyDto, Object]),
    __metadata("design:returntype", Promise)
], AstralArchiveController.prototype, "upload", null);
exports.AstralArchiveController = AstralArchiveController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('astral-archive'),
    __metadata("design:paramtypes", [astral_archive_service_1.AstralArchiveService])
], AstralArchiveController);
//# sourceMappingURL=astral-archive.controller.js.map