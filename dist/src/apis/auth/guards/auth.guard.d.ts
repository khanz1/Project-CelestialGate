import { CanActivate, ExecutionContext } from '@nestjs/common';
import { User } from '../models/user.model';
import { Helper } from '../../../utils/helper';
export declare class AuthGuard implements CanActivate {
    private helper;
    private readonly userModel;
    private logger;
    constructor(helper: Helper, userModel: typeof User);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
