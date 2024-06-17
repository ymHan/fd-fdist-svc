import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { VideoEntity, CommonCodeEntity } from '@/model/entities';

@Entity()
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  videoId: number;

  // @Column()
  // reportType: number;

  // @Column()
  // report: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => VideoEntity, (video) => video.reports)
  @JoinColumn()
  video: VideoEntity;

  @ManyToOne(() => CommonCodeEntity, (commoncode) => commoncode.code)
  @JoinColumn()
  commoncode: CommonCodeEntity;
}
