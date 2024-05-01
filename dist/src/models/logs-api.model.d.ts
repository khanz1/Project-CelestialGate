import { Model } from 'sequelize-typescript';
export declare class LogsApi extends Model {
    id: number;
    text: string;
    operation: string;
    ipAddress: string;
    createdAt: Date;
    updatedAt: Date;
}
