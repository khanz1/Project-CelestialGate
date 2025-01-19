import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBodyDto } from './dto/create-body.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Redirect } from './model/redirect.model';
import { RedirectLog } from './model/redirect-log.model';
import ResponseConstant from '@/constants/response.constant';

@Injectable()
export class GalacticPathService {
  constructor(
    @InjectModel(Redirect) private readonly redirectModel: typeof Redirect,
    @InjectModel(RedirectLog)
    private readonly redirectLogModel: typeof RedirectLog,
  ) {}
  async createRedirect(body: Partial<Redirect>, userId: number) {
    body.userId = userId;
    return await this.redirectModel.create(body);
  }

  async getRedirects() {
    return await this.redirectModel.findAll();
  }

  async getRedirectById(id: number) {
    return await this.redirectModel.findByPk(id);
  }

  async getRedirectFromUrl(fromUrl: string) {
    const redirect = await this.redirectModel.findOne({
      where: { fromUrl },
    });

    if (!redirect) {
      throw new NotFoundException(
        ResponseConstant.GET_REDIRECT_NOT_FOUND(fromUrl),
      );
    }

    return redirect;
  }

  async createRedirectLog(body: Partial<RedirectLog>) {
    const redirect = await this.getRedirectById(body.redirectId);
    if (!redirect) {
      throw new NotFoundException(
        ResponseConstant.GET_REDIRECT_NOT_FOUND(body.redirectId),
      );
    }

    await redirect.increment('access_count');
    return await this.redirectLogModel.create(body);
  }

  async getRedirectLogs() {
    return await this.redirectLogModel.findAll();
  }

  async getRedirectLogsByRedirectId(redirectId: number) {
    return await this.redirectLogModel.findAll({
      where: { redirectId },
    });
  }

  async getRedirectLogById(id: string) {
    return await this.redirectLogModel.findByPk(id, {
      include: [this.redirectModel],
    });
  }
}
