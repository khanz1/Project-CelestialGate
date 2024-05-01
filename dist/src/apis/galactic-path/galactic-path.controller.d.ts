import { GalacticPathService } from './galactic-path.service';
import { CreateBodyDto } from './dto/create-body.dto';
import { AuthRequest } from 'src/app.interface';
import { CreateLogBodyDto } from './dto/create-logs-body.dto';
export declare class GalacticPathController {
    private galacticPathService;
    constructor(galacticPathService: GalacticPathService);
    createRedirect(body: CreateBodyDto, req: AuthRequest): Promise<import("./model/redirect.model").Redirect>;
    getRedirects(): Promise<import("./model/redirect.model").Redirect[]>;
    getRedirectById(id: string): Promise<any>;
    getRedirectByFromUrl(fromUrl: string): Promise<import("./model/redirect.model").Redirect>;
    createRedirectLog(body: CreateLogBodyDto): Promise<import("./model/redirect-log.model").RedirectLog>;
    getRedirectLogs(): Promise<import("./model/redirect-log.model").RedirectLog[]>;
    getRedirectLogById(id: string): Promise<import("./model/redirect-log.model").RedirectLog>;
}
