import { Module } from '@nestjs/common';
import { AstralArchiveController } from './astral-archive.controller';
import { AstralArchiveService } from './astral-archive.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../auth/models/user.model';
import { OwnedFile } from './models/owned-files.model';
import { AuthHelper } from '@/utils/auth.helper';
import { LogsApi } from '@/models/logs-api.model';

@Module({
  imports: [SequelizeModule.forFeature([User, LogsApi, OwnedFile])],
  controllers: [AstralArchiveController],
  providers: [AstralArchiveService, AuthHelper],
})
export class AstralArchiveModule {}
