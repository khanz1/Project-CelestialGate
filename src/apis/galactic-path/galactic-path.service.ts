import { Injectable } from '@nestjs/common';
import { CreateBodyDto } from './dto/create-body.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Redirect } from './model/redirect.model';
import { RedirectLog } from './model/redirect-log.model';

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

  async getRedirectById(id: string) {
    return await this.redirectModel.findByPk(id);
  }

  async getRedirectFromUrl(fromUrl: string) {
    return await this.redirectModel.findOne({
      where: { fromUrl },
    });
  }

  async createRedirectLog(body: Partial<RedirectLog>) {
    return await this.redirectLogModel.create(body);
  }

  async getRedirectLogs() {
    return await this.redirectLogModel.findAll();
  }

  async getRedirectLogsByRedirectId(redirectId: string) {
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
