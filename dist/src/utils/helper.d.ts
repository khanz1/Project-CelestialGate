import { ConfigService } from '@nestjs/config';
export declare class Helper {
    private configService;
    private readonly JWT_SECRET;
    constructor(configService: ConfigService);
    hashPassword(password: string): string;
    comparePassword(password: string, hash: string): boolean;
    signToken(payload: any): Promise<string>;
    verifyToken<T = any>(token: string): Promise<T>;
}
