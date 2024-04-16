import { UserAccountEntity } from '@/model/entities';
import { RoomWebsocketEntity } from './room.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';

@Entity()
export class MessageWebsocketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => UserAccountEntity, (user) => user.messages)
  @JoinColumn()
  user: UserAccountEntity;

  @ManyToOne(() => RoomWebsocketEntity, (room) => room.messages)
  @JoinTable()
  room: RoomWebsocketEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
