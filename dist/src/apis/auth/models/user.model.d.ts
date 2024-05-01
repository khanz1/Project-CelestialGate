import { Model } from 'sequelize-typescript';
export declare class User extends Model {
    id: number;
    uid: string;
    username: string;
    email: string;
    password: string;
    pictureUrl: string;
    isVerified: boolean;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
