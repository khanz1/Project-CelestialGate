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
  Default,
} from 'sequelize-typescript';
import { User } from '../../auth/models/user.model';

// CREATE TABLE gp_redirects (
//     id         SERIAL PRIMARY KEY,
//     from_url   VARCHAR(255) NOT NULL,
//     to_url     TEXT NOT NULL,
//     active_from TIMESTAMP,
//     active_to   TIMESTAMP,
//     valid_from TIMESTAMP,
//     valid_to TIMESTAMP,
//     access_count INTEGER NOT NULL DEFAULT 0,
//     user_id    INTEGER,
//     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES auth_users (id)
// );

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

  @Column({
    field: 'valid_from',
  })
  validFrom: Date;

  @Column({
    field: 'valid_to',
  })
  validTo: Date;

  @Default(0)
  @Column({
    field: 'access_count',
  })
  accessCount: number;

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
