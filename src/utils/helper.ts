import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Helper {
  private readonly JWT_SECRET = this.configService.get<string>('JWT_SECRET');
  constructor(private configService: ConfigService) {}
  hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  async signToken(payload: any): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const token = jwt.sign(payload, this.JWT_SECRET);
        resolve(token);
      } catch (err) {
        reject(err);
      }
    });
  }

  verifyToken<T = any>(token: string): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        const payload = jwt.verify(token, this.JWT_SECRET);
        resolve(payload as T);
      } catch (err) {
        reject(err);
      }
    });
  }
}
