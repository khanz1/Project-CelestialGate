import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GalacticPathService } from './galactic-path.service';
import { CreateBodyDto } from './dto/create-body.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthRequest } from 'src/app.interface';
import { CreateLogBodyDto } from './dto/create-logs-body.dto';

@Controller('galactic-path')
export class GalacticPathController {
  constructor(private galacticPathService: GalacticPathService) {}

  @UseGuards(AuthGuard)
  @Post('redirects')
  createRedirect(@Body() body: CreateBodyDto, @Req() req: AuthRequest) {
    return this.galacticPathService.createRedirect(body, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('redirects')
  getRedirects() {
    return this.galacticPathService.getRedirects();
  }

  // @UseGuards(AuthGuard)
  @Get('redirects/:id(\\d+)')
  async getRedirectById(@Param('id') id: string) {
    const [redirect, redirectLogs] = await Promise.all([
      this.galacticPathService.getRedirectById(id),
      this.galacticPathService.getRedirectLogsByRedirectId(id),
    ]);

    return {
      ...redirect.toJSON(),
      logs: redirectLogs.map((log) => log.toJSON()),
    };
  }

  @Get('redirects/:fromUrl')
  getRedirectByFromUrl(@Param('fromUrl') fromUrl: string) {
    return this.galacticPathService.getRedirectFromUrl(fromUrl);
  }

  @Post('logs/redirects')
  createRedirectLog(@Body() body: CreateLogBodyDto) {
    return this.galacticPathService.createRedirectLog(body);
  }

  @Get('logs/redirects')
  getRedirectLogs() {
    return this.galacticPathService.getRedirectLogs();
  }

  @Get('logs/redirects/:id')
  getRedirectLogById(@Param('id') id: string) {
    return this.galacticPathService.getRedirectLogById(id);
  }
}
