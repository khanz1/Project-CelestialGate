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
import { nanoid } from 'nanoid';

@Table({ tableName: 'auth_users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Default(nanoid)
  @Column
  uid: string;

  @Unique({
    name: 'constraint_username',
    msg: 'Username already used',
  })
  @Column({
    field: 'username',
  })
  username: string;

  @Unique({
    name: 'constraint_email',
    msg: 'Email already used',
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

  @Column({ defaultValue: 'on-boarding' })
  status: string;

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
