import { Model } from 'sequelize-typescript';
import { User } from './user.model';
export declare class OAuth extends Model {
    id: number;
    provider: string;
    userId: number;
    User: User;
    oauthId: number;
    name: string;
    username: string;
    email: string;
    pictureUrl: string;
    oauthCreatedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
