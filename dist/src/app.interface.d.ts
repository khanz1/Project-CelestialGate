import { Request } from 'express';
import { User } from './apis/auth/models/user.model';
export interface AuthRequest extends Request {
    user: User;
}
