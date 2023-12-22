import { Module } from '@nestjs/common';
import { AstralArchiveController } from './astral-archive.controller';
import { AstralArchiveService } from './astral-archive.service';
import { Helper } from 'src/utils/helper';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../auth/models/user.model';
import { LogsApi } from 'src/models/logs-api.model';
import { OwnedFile } from './models/owned-files.model';

@Module({
  imports: [SequelizeModule.forFeature([User, LogsApi, OwnedFile])],
  controllers: [AstralArchiveController],
  providers: [AstralArchiveService, Helper],
})
export class AstralArchiveModule {}
