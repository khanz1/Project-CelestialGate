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
        return {
          dialect: configService.get('DB_DIALECT'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          models: [User, OAuth, LogsApi, OwnedFile],
          logging: (sql) => Logger.verbose(sql),
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
