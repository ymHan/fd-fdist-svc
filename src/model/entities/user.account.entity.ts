import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, Unique } from 'typeorm';
import { AccountRoles, AccountStates } from '@enum/index';

@Entity({ name: 'user' })
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsEmail()
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password!: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  name!: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  nickname!: string;

  @Column({ type: 'enum', enum: AccountRoles })
  usertype!: AccountRoles;

  @Column({ type: 'boolean', default: true })
  pushreceive: boolean;

  @Column({ type: 'boolean', default: true })
  emailreceive: boolean;

  @Column({ type: 'enum', name: 'state', enum: AccountStates, default: AccountStates.INACTIVE })
  'state': AccountStates;

  @Column({ type: 'boolean', default: false })
  isVerifiedEmail: boolean;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  updatedAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  deletedAt: Date;
}
