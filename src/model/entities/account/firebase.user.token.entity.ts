import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'firebase_user_token' })
export class FirebaseUserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  deviceToken: string;

  @CreateDateColumn({ name: 'create_at', default: () => 'CURRENT_TIMESTAMP', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
