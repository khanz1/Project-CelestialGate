import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { Helper } from '../../../utils/helper';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger(AuthGuard.name);

  constructor(
    private helper: Helper,
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.helper.verifyToken<{ uid: string }>(token);

      this.logger.log(`got user from cache: ${payload.uid}`);
      const user = await this.userModel.findOne({
        where: { uid: payload.uid },
      });
      if (!user) {
        throw new UnauthorizedException({
          message: `You are not registered`,
        });
      }

      request['user'] = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException({
        message: `You are not registered`,
      });
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
