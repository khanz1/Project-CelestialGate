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

@Table({ tableName: 'aa_owned_files', underscored: true })
export class OwnedFile extends Model {
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
    field: 'file_name',
  })
  fileName: string;

  @Column({
    field: 'file_url',
  })
  fileUrl: string;

  @Column({
    field: 'file_type',
  })
  fileType: string;

  @Column({
    field: 'public_file_url',
  })
  publicFileUrl: string;

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
