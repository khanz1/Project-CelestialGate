import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import { OAuth } from './models/oauth.model';
import { AuthHelper } from '@/utils/auth.helper';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([User, OAuth]),
    CacheModule.register(),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthHelper],
})
export class AuthModule {}
