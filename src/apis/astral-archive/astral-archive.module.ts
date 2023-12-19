import { Module } from '@nestjs/common';
import { AstralArchiveController } from './astral-archive.controller';
import { AstralArchiveService } from './astral-archive.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [AstralArchiveController],
  providers: [AstralArchiveService],
})
export class AstralArchiveModule {}
