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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_model_1 = require("./models/user.model");
const sequelize_1 = require("@nestjs/sequelize");
const config_1 = require("@nestjs/config");
const sequelize_2 = require("sequelize");
const auth_helper_1 = require("./auth.helper");
const url = __importStar(require("url"));
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const oauth_model_1 = require("./models/oauth.model");
const auth_types_1 = require("./auth.types");
const nanoid_1 = require("nanoid");
let AuthService = AuthService_1 = class AuthService {
    constructor(userModel, oauthModel, configService, helper, httpService) {
        this.userModel = userModel;
        this.oauthModel = oauthModel;
        this.configService = configService;
        this.helper = helper;
        this.httpService = httpService;
        this.logger = new common_1.Logger(AuthService_1.name);
        this.CLIENT_URL = this.configService.get('CLIENT_URL');
    }
    async signUp(data) {
        const newUser = data;
        newUser.password = this.helper.hashPassword(data.password);
        newUser.status = 'on-boarding';
        try {
            const user = await this.userModel.create(newUser);
            const URI = url.format({
                pathname: `${this.CLIENT_URL}/auth/validate`,
                query: { uid: user.uid },
            });
            this.logger.log(`Validation URL: ${URI} will be sent to ${user.email}`);
            return {
                accessToken: await this.helper.signToken({ uid: user.uid }),
            };
        }
        catch (err) {
            console.log(err);
            if (err instanceof sequelize_2.UniqueConstraintError ||
                err instanceof sequelize_2.ValidationError) {
                throw new common_1.BadRequestException({
                    message: err.errors[0].message,
                });
            }
            else {
                throw new common_1.InternalServerErrorException({
                    message: 'Internal Server Error',
                });
            }
        }
    }
    async signIn(data) {
        this.logger.log(`Sign in with ${JSON.stringify(data)}`);
        let user;
        try {
            if (!data.username && !data.email) {
                throw new common_1.BadRequestException({
                    message: 'Username or email is required',
                });
            }
            if (data.username) {
                user = await this.userModel.findOne({
                    where: { username: data.username },
                });
            }
            if (data.email) {
                user = await this.userModel.findOne({ where: { email: data.email } });
            }
            if (!user) {
                throw new common_1.UnauthorizedException({
                    message: 'Username/Email or password is wrong',
                });
            }
            console.log(user);
            const isPasswordMatch = this.helper.comparePassword(data.password, user.password);
            if (!isPasswordMatch) {
                throw new common_1.UnauthorizedException({
                    message: 'Username/Email or password is wrong',
                });
            }
            return {
                accessToken: await this.helper.signToken({ uid: user.uid }),
            };
        }
        catch (err) {
            throw err;
        }
    }
    async signInGoogle(data) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get('https://www.googleapis.com/oauth2/v3/userinfo', {
            params: {
                access_token: data.access_token,
            },
        })
            .pipe((0, rxjs_1.catchError)((error) => {
            this.logger.error(error.response.data);
            throw new common_1.InternalServerErrorException(`we are experiencing issue, please try again later`);
        })));
        const oauth = await this.oauthModel.findOne({
            where: {
                provider: auth_types_1.OAUTH_PROVIDER.GOOGLE,
                oauthId: response.data.sub,
            },
            include: [this.userModel],
        });
        if (oauth) {
            const accessToken = await this.helper.signToken({ uid: oauth.User.uid });
            return {
                accessToken,
                statusCode: 200,
                message: `Login success`,
            };
        }
        const [user, created] = await this.userModel.findOrCreate({
            where: {
                email: response.data.email,
            },
            defaults: {
                username: response.data.email.split('@')[0],
                email: response.data.email,
                password: this.helper.hashPassword((0, nanoid_1.nanoid)(10)),
                pictureUrl: response.data.picture,
                isVerified: true,
                isSubscribed: false,
                status: 'active',
            },
        });
        if (!created) {
            this.logger.log(`User already exist, updating the picture`);
        }
        await this.oauthModel.create({
            provider: auth_types_1.OAUTH_PROVIDER.GOOGLE,
            userId: user.id,
            oauthId: response.data.sub,
            name: response.data.name,
            username: response.data.email.split('@')[0],
            email: response.data.email,
            pictureUrl: response.data.picture,
        });
        const accessToken = await this.helper.signToken({ uid: user.uid });
        return {
            accessToken,
            statusCode: 201,
            message: `Login success`,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(oauth_model_1.OAuth)),
    __metadata("design:paramtypes", [Object, Object, config_1.ConfigService,
        auth_helper_1.Helper,
        axios_1.HttpService])
], AuthService);
//# sourceMappingURL=auth.service.js.map