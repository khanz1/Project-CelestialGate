import { Model } from 'sequelize-typescript';
import { Redirect } from './redirect.model';
export declare class RedirectLog extends Model {
    id: number;
    redirectId: number;
    Redirect: Redirect;
    ipAddress: string;
    query: string;
    userAgent: string;
    data: string;
    createdAt: Date;
    updatedAt: Date;
}
