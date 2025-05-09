import { Module, NestModule, MiddlewareConsumer, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AstralArchiveModule } from './apis/astral-archive/astral-archive.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './apis/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './apis/auth/models/user.model';
import { OAuth } from './apis/auth/models/oauth.model';
import { LogsApi } from './models/logs-api.model';
import { OwnedFile } from './apis/astral-archive/models/owned-files.model';
import { GalacticPathModule } from './apis/galactic-path/galactic-path.module';
import { Redirect } from './apis/galactic-path/model/redirect.model';
import { RedirectLog } from './apis/galactic-path/model/redirect-log.model';
import { AuthHelper } from './utils/auth.helper';

@Module({
  imports: [
    AstralArchiveModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production'],
    }),
    AuthModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = {
          dialect: configService.get('DB_DIALECT'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          ...(configService.get('NODE_ENV') === 'production' && {
            dialectOptions: {
              ssl: {
                require: false,
                rejectUnauthorized: false,
              },
            },
          }),
          models: [User, OAuth, LogsApi, OwnedFile, Redirect, RedirectLog],
          logging: (sql) => Logger.verbose(sql),
        };
        return config;
      },
    }),
    GalacticPathModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthHelper],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
