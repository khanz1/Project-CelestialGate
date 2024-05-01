import { Module } from '@nestjs/common';
import { GalacticPathController } from './galactic-path.controller';
import { GalacticPathService } from './galactic-path.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Redirect } from './model/redirect.model';
import { RedirectLog } from './model/redirect-log.model';
import { Helper } from '../../utils/helper';
import { User } from '../auth/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Redirect, RedirectLog])],
  controllers: [GalacticPathController],
  providers: [GalacticPathService, Helper],
})
export class GalacticPathModule {}
