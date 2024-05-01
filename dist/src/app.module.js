"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const astral_archive_module_1 = require("./apis/astral-archive/astral-archive.module");
const config_1 = require("@nestjs/config");
const logger_middleware_1 = require("./middleware/logger.middleware");
const auth_module_1 = require("./apis/auth/auth.module");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./apis/auth/models/user.model");
const oauth_model_1 = require("./apis/auth/models/oauth.model");
const logs_api_model_1 = require("./models/logs-api.model");
const owned_files_model_1 = require("./apis/astral-archive/models/owned-files.model");
const galactic_path_module_1 = require("./apis/galactic-path/galactic-path.module");
const redirect_model_1 = require("./apis/galactic-path/model/redirect.model");
const redirect_log_model_1 = require("./apis/galactic-path/model/redirect-log.model");
const helper_1 = require("./utils/helper");
const pg_1 = __importDefault(require("pg"));
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            astral_archive_module_1.AstralArchiveModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env.development', '.env.production'],
            }),
            auth_module_1.AuthModule,
            sequelize_1.SequelizeModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    return {
                        dialect: configService.get('DB_DIALECT'),
                        dialectModule: pg_1.default,
                        host: configService.get('DB_HOST'),
                        port: configService.get('DB_PORT'),
                        username: configService.get('DB_USERNAME'),
                        password: configService.get('DB_PASSWORD'),
                        database: configService.get('DB_DATABASE'),
                        models: [user_model_1.User, oauth_model_1.OAuth, logs_api_model_1.LogsApi, owned_files_model_1.OwnedFile, redirect_model_1.Redirect, redirect_log_model_1.RedirectLog],
                        logging: (sql) => common_1.Logger.verbose(sql),
                    };
                },
            }),
            galactic_path_module_1.GalacticPathModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, helper_1.Helper],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map