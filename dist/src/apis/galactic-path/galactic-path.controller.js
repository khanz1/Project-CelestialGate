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
exports.GalacticPathController = void 0;
const common_1 = require("@nestjs/common");
const galactic_path_service_1 = require("./galactic-path.service");
const create_body_dto_1 = require("./dto/create-body.dto");
const auth_guard_1 = require("../auth/guards/auth.guard");
const create_logs_body_dto_1 = require("./dto/create-logs-body.dto");
let GalacticPathController = class GalacticPathController {
    constructor(galacticPathService) {
        this.galacticPathService = galacticPathService;
    }
    createRedirect(body, req) {
        return this.galacticPathService.createRedirect(body, req.user.id);
    }
    getRedirects() {
        return this.galacticPathService.getRedirects();
    }
    async getRedirectById(id) {
        const [redirect, redirectLogs] = await Promise.all([
            this.galacticPathService.getRedirectById(id),
            this.galacticPathService.getRedirectLogsByRedirectId(id),
        ]);
        return {
            ...redirect.toJSON(),
            logs: redirectLogs.map((log) => log.toJSON()),
        };
    }
    getRedirectByFromUrl(fromUrl) {
        return this.galacticPathService.getRedirectFromUrl(fromUrl);
    }
    createRedirectLog(body) {
        return this.galacticPathService.createRedirectLog(body);
    }
    getRedirectLogs() {
        return this.galacticPathService.getRedirectLogs();
    }
    getRedirectLogById(id) {
        return this.galacticPathService.getRedirectLogById(id);
    }
};
exports.GalacticPathController = GalacticPathController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('redirects'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_body_dto_1.CreateBodyDto, Object]),
    __metadata("design:returntype", void 0)
], GalacticPathController.prototype, "createRedirect", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('redirects'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GalacticPathController.prototype, "getRedirects", null);
__decorate([
    (0, common_1.Get)('redirects/:id(\\d+)'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GalacticPathController.prototype, "getRedirectById", null);
__decorate([
    (0, common_1.Get)('redirects/:fromUrl'),
    __param(0, (0, common_1.Param)('fromUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GalacticPathController.prototype, "getRedirectByFromUrl", null);
__decorate([
    (0, common_1.Post)('logs/redirects'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_logs_body_dto_1.CreateLogBodyDto]),
    __metadata("design:returntype", void 0)
], GalacticPathController.prototype, "createRedirectLog", null);
__decorate([
    (0, common_1.Get)('logs/redirects'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GalacticPathController.prototype, "getRedirectLogs", null);
__decorate([
    (0, common_1.Get)('logs/redirects/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GalacticPathController.prototype, "getRedirectLogById", null);
exports.GalacticPathController = GalacticPathController = __decorate([
    (0, common_1.Controller)('galactic-path'),
    __metadata("design:paramtypes", [galactic_path_service_1.GalacticPathService])
], GalacticPathController);
//# sourceMappingURL=galactic-path.controller.js.map