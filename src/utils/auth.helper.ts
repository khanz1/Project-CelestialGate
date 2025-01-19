import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthHelper {
  private readonly JWT_SECRET = this.configService.get<string>('JWT_SECRET');
  constructor(private configService: ConfigService) {}
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async signToken(payload: any): Promise<string> {
    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: '1h',
    });
  }

  verifyToken<T = any>(token: string): T {
    return jwt.verify(token, this.JWT_SECRET) as T;
  }
}
