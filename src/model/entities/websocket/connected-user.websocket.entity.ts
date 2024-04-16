import { UserAccountEntity } from '@/model/entities';

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConnectedUserWebsocketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  socketId: string;

  @ManyToOne(() => UserAccountEntity, (user) => user.connections)
  @JoinColumn()
  user: UserAccountEntity;
}
