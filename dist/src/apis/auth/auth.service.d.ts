import { User } from './models/user.model';
import { SignUpDto } from './dto/sign-up.dto';
import { ConfigService } from '@nestjs/config';
import { Helper } from './auth.helper';
import { SignInDto } from './dto/sign-in.dto';
import { HttpService } from '@nestjs/axios';
import { OAuth } from './models/oauth.model';
export declare class AuthService {
    private readonly userModel;
    private readonly oauthModel;
    private readonly configService;
    private helper;
    private readonly httpService;
    private readonly logger;
    private readonly CLIENT_URL;
    constructor(userModel: typeof User, oauthModel: typeof OAuth, configService: ConfigService, helper: Helper, httpService: HttpService);
    signUp(data: SignUpDto): Promise<{
        accessToken: string;
    }>;
    signIn(data: SignInDto): Promise<{
        accessToken: string;
    }>;
    signInGoogle(data: any): Promise<{
        accessToken: string;
        statusCode: number;
        message: string;
    }>;
}
