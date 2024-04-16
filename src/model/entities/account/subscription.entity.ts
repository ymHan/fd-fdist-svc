import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number; // 구독 아이디

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // 생성일
}
