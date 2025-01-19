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
import { AuthRequest } from '@/app.interface';
import { CreateLogBodyDto } from './dto/create-logs-body.dto';
import { Helper } from '@/utils/helper';
import ResponseConstant from '@/constants/response.constant';

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
  async getRedirects() {
    const redirects = await this.galacticPathService.getRedirects();
    return Helper.fResponse(
      redirects,
      ResponseConstant.OK,
      ResponseConstant.GET_REDIRECTS_SUCCESS,
    );
  }

  // @UseGuards(AuthGuard)
  @Get('redirects/:id(\\d+)')
  async getRedirectById(@Param('id') id: number) {
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
  async getRedirectByFromUrl(@Param('fromUrl') fromUrl: string) {
    const redirect = await this.galacticPathService.getRedirectFromUrl(fromUrl);
    return Helper.fResponse(
      redirect,
      ResponseConstant.OK,
      ResponseConstant.GET_REDIRECT_SUCCESS,
    );
  }

  @Post('logs/redirects')
  async createRedirectLog(@Body() body: CreateLogBodyDto) {
    const log = await this.galacticPathService.createRedirectLog(body);
    return Helper.fResponse(
      log,
      ResponseConstant.OK,
      ResponseConstant.CREATE_REDIRECT_LOG_SUCCESS,
    );
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
