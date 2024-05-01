import { Model } from 'sequelize-typescript';
import { User } from '../../auth/models/user.model';
export declare class Redirect extends Model {
    id: number;
    userId: number;
    User: User;
    fromUrl: string;
    toUrl: string;
    activeFrom: Date;
    activeTo: Date;
    createdAt: Date;
    updatedAt: Date;
}
