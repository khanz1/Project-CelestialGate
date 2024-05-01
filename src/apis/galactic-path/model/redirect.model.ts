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
import { User } from '../../auth/models/user.model';

//! TODO: add active_from date and active_to date.
@Table({ tableName: 'gp_redirects', underscored: true })
export class Redirect extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column({
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User)
  User: User;

  @Column({
    field: 'from_url',
  })
  fromUrl: string;

  @Column({
    field: 'to_url',
  })
  toUrl: string;

  @Column({
    field: 'active_from',
  })
  activeFrom: Date;

  @Column({
    field: 'active_to',
  })
  activeTo: Date;

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
