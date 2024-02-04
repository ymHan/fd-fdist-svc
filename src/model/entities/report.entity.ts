import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class ReportEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  videoId: number;

  @Column()
  reportType: number;

  @Column()
  report: string;

  @CreateDateColumn()
  createdAt: Date;
}
