"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalacticPathModule = void 0;
const common_1 = require("@nestjs/common");
const galactic_path_controller_1 = require("./galactic-path.controller");
const galactic_path_service_1 = require("./galactic-path.service");
const sequelize_1 = require("@nestjs/sequelize");
const redirect_model_1 = require("./model/redirect.model");
const redirect_log_model_1 = require("./model/redirect-log.model");
const helper_1 = require("../../utils/helper");
const user_model_1 = require("../auth/models/user.model");
let GalacticPathModule = class GalacticPathModule {
};
exports.GalacticPathModule = GalacticPathModule;
exports.GalacticPathModule = GalacticPathModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([user_model_1.User, redirect_model_1.Redirect, redirect_log_model_1.RedirectLog])],
        controllers: [galactic_path_controller_1.GalacticPathController],
        providers: [galactic_path_service_1.GalacticPathService, helper_1.Helper],
    })
], GalacticPathModule);
//# sourceMappingURL=galactic-path.module.js.map