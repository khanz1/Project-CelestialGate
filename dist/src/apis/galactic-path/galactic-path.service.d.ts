import { Redirect } from './model/redirect.model';
import { RedirectLog } from './model/redirect-log.model';
export declare class GalacticPathService {
    private readonly redirectModel;
    private readonly redirectLogModel;
    constructor(redirectModel: typeof Redirect, redirectLogModel: typeof RedirectLog);
    createRedirect(body: Partial<Redirect>, userId: number): Promise<Redirect>;
    getRedirects(): Promise<Redirect[]>;
    getRedirectById(id: string): Promise<Redirect>;
    getRedirectFromUrl(fromUrl: string): Promise<Redirect>;
    createRedirectLog(body: Partial<RedirectLog>): Promise<RedirectLog>;
    getRedirectLogs(): Promise<RedirectLog[]>;
    getRedirectLogsByRedirectId(redirectId: string): Promise<RedirectLog[]>;
    getRedirectLogById(id: string): Promise<RedirectLog>;
}
