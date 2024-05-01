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
exports.GalacticPathService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const redirect_model_1 = require("./model/redirect.model");
const redirect_log_model_1 = require("./model/redirect-log.model");
let GalacticPathService = class GalacticPathService {
    constructor(redirectModel, redirectLogModel) {
        this.redirectModel = redirectModel;
        this.redirectLogModel = redirectLogModel;
    }
    async createRedirect(body, userId) {
        body.userId = userId;
        return await this.redirectModel.create(body);
    }
    async getRedirects() {
        return await this.redirectModel.findAll();
    }
    async getRedirectById(id) {
        return await this.redirectModel.findByPk(id);
    }
    async getRedirectFromUrl(fromUrl) {
        return await this.redirectModel.findOne({
            where: { fromUrl },
        });
    }
    async createRedirectLog(body) {
        return await this.redirectLogModel.create(body);
    }
    async getRedirectLogs() {
        return await this.redirectLogModel.findAll();
    }
    async getRedirectLogsByRedirectId(redirectId) {
        return await this.redirectLogModel.findAll({
            where: { redirectId },
        });
    }
    async getRedirectLogById(id) {
        return await this.redirectLogModel.findByPk(id, {
            include: [this.redirectModel],
        });
    }
};
exports.GalacticPathService = GalacticPathService;
exports.GalacticPathService = GalacticPathService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(redirect_model_1.Redirect)),
    __param(1, (0, sequelize_1.InjectModel)(redirect_log_model_1.RedirectLog)),
    __metadata("design:paramtypes", [Object, Object])
], GalacticPathService);
//# sourceMappingURL=galactic-path.service.js.map