import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ResetPasswordEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsEmail()
  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  code!: string;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
