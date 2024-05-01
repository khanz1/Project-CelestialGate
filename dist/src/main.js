"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const error_middleware_1 = require("./middleware/error.middleware");
const config_1 = require("@nestjs/config");
const helmet_1 = __importDefault(require("helmet"));
const express_1 = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_1.json)({ limit: '1gb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '1gb' }));
    app.use((0, helmet_1.default)());
    app.enableCors();
    const configService = app.get(config_1.ConfigService);
    const PORT = +configService.get('PORT') || 8000;
    const httpAdapterHost = app.get(core_1.HttpAdapterHost);
    app.useGlobalFilters(new error_middleware_1.AllExceptionsFilter(httpAdapterHost));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    await app.listen(PORT);
    const NODE_ENV = process.env.NODE_ENV;
    const serverHost = process.env.SERVER_HOST;
    const projectName = process.env['npm_package_name'];
    const projectVersion = process.env['npm_package_version'];
    common_1.Logger.log(``);
    common_1.Logger.log(`--------- ⭐ Project ${projectName} ⭐ -------------`);
    common_1.Logger.log(`🚀 App running on         : ${serverHost}`);
    common_1.Logger.log(`👨 contact dev            : assistance.xavier@gmail.com 🚀`);
    common_1.Logger.log(`⚓ Environment            : ${NODE_ENV}`);
    common_1.Logger.log(`📦 Version                : ${projectVersion}`);
    common_1.Logger.log(`----------------------------------------------------`);
}
bootstrap();
//# sourceMappingURL=main.js.map