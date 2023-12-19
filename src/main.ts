import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './middleware/error.middleware';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '1gb' }));
  app.use(urlencoded({ extended: true, limit: '1gb' }));
  app.use(helmet());

  app.enableCors();

  const configService = app.get(ConfigService);
  const PORT = +configService.get<string>('PORT') || 8000;

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(PORT);

  const NODE_ENV = process.env.NODE_ENV;
  const serverHost = process.env.SERVER_HOST;
  const projectName = process.env['npm_package_name'];
  const projectVersion = process.env['npm_package_version'];

  Logger.log(``);
  Logger.log(`--------- ⭐ Project ${projectName} ⭐ -------------`);
  Logger.log(`🚀 App running on         : ${serverHost}`);
  Logger.log(`👨 contact dev            : assistance.xavier@gmail.com 🚀`);
  Logger.log(`⚓ Environment            : ${NODE_ENV}`);
  Logger.log(`📦 Version                : ${projectVersion}`);
  Logger.log(`----------------------------------------------------`);
}
bootstrap();
