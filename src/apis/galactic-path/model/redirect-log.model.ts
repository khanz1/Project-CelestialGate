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
import { Redirect } from './redirect.model';

@Table({ tableName: 'gp_redirects_logs', underscored: true })
export class RedirectLog extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @ForeignKey(() => Redirect)
  @Column({
    field: 'redirect_id',
  })
  redirectId: number;

  @BelongsTo(() => Redirect)
  Redirect: Redirect;

  @Column({
    field: 'ip_address',
  })
  ipAddress: string;

  @Column({
    field: 'query',
  })
  query: string;

  @Column({
    field: 'user_agent',
  })
  userAgent: string;

  @Column({
    field: 'data',
  })
  data: string;

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
