import {
  AllowNull,
  Column,
  CreatedAt,
  AutoIncrement,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'logs_api', underscored: true })
export class LogsApi extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Column
  text: string;

  @Column
  operation: string;

  @Column({
    field: 'ip_address',
  })
  ipAddress: string;

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
