import { Module } from '@nestjs/common';
import { GalacticPathController } from './galactic-path.controller';
import { GalacticPathService } from './galactic-path.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Redirect } from './model/redirect.model';
import { RedirectLog } from './model/redirect-log.model';
import { User } from '../auth/models/user.model';
import { AuthHelper } from '@/utils/auth.helper';

@Module({
  imports: [SequelizeModule.forFeature([User, Redirect, RedirectLog])],
  controllers: [GalacticPathController],
  providers: [GalacticPathService, AuthHelper],
})
export class GalacticPathModule {}
