import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { Helper } from '@/utils/helper';
import ValidationConstant from '@/constants/validation.constant';

@Table({ tableName: 'auth_users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Default(() => Helper.generateUID())
  @Column
  uid: string;

  @Unique({
    name: ValidationConstant.USERNAME_UNIQUE_NAME,
    msg: ValidationConstant.USERNAME_UNIQUE_MESSAGE,
  })
  @Column({
    field: 'username',
  })
  username: string;

  @Unique({
    name: ValidationConstant.EMAIL_UNIQUE_NAME,
    msg: ValidationConstant.EMAIL_UNIQUE_MESSAGE,
  })
  @Column
  email: string;

  @Column
  password: string;

  @Column({
    field: 'picture_url',
  })
  pictureUrl: string;

  @Column({ defaultValue: false, field: 'is_verified' })
  isVerified: boolean;

  @CreatedAt
  @Column({
    field: 'created_at',
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    field: 'updated_at',
  })
  updatedAt: Date;
}
