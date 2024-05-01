"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstralArchiveModule = void 0;
const common_1 = require("@nestjs/common");
const astral_archive_controller_1 = require("./astral-archive.controller");
const astral_archive_service_1 = require("./astral-archive.service");
const helper_1 = require("../../utils/helper");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("../auth/models/user.model");
const logs_api_model_1 = require("../../models/logs-api.model");
const owned_files_model_1 = require("./models/owned-files.model");
let AstralArchiveModule = class AstralArchiveModule {
};
exports.AstralArchiveModule = AstralArchiveModule;
exports.AstralArchiveModule = AstralArchiveModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([user_model_1.User, logs_api_model_1.LogsApi, owned_files_model_1.OwnedFile])],
        controllers: [astral_archive_controller_1.AstralArchiveController],
        providers: [astral_archive_service_1.AstralArchiveService, helper_1.Helper],
    })
], AstralArchiveModule);
//# sourceMappingURL=astral-archive.module.js.map