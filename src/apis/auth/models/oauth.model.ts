import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  AutoIncrement,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'auth_oauth_list', underscored: true })
export class OAuth extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Column
  provider: string;

  @ForeignKey(() => User)
  @Column({
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User)
  User: User;

  @Column({
    field: 'oauth_id',
  })
  oauthId: number;

  @Column
  name: string;

  @Column
  username: string;

  @Column
  email: string;

  @Column({
    field: 'picture_url',
  })
  pictureUrl: string;

  @Column({
    field: 'oauth_created_at',
  })
  oauthCreatedAt: Date;

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
