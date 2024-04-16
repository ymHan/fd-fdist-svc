import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { VideoEntity } from '@/model/entities';
@Entity()
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  videoId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => VideoEntity, (video) => video.likes)
  @JoinColumn()
  video: VideoEntity;
}
