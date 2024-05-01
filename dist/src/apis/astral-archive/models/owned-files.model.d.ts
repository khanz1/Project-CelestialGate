import { Model } from 'sequelize-typescript';
import { User } from '../../auth/models/user.model';
export declare class OwnedFile extends Model {
    id: number;
    userId: number;
    User: User;
    fileName: string;
    fileUrl: string;
    fileType: string;
    publicFileUrl: string;
    createdAt: Date;
    updatedAt: Date;
}
