import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(body: SignUpDto): Promise<{
        accessToken: string;
    }>;
    signIn(body: SignInDto): Promise<{
        accessToken: string;
    }>;
    signInGoogle(body: any): Promise<{
        accessToken: string;
        statusCode: number;
        message: string;
    }>;
}
