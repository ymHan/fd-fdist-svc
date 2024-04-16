import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserAccountEntity } from '@/model/entities';
import { RoomWebsocketEntity } from '@entities/websocket/room.entity';

@Entity()
export class JoinedRoomWebsocketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  socketId: string;

  @ManyToOne(() => UserAccountEntity, (user) => user.joinedRooms)
  @JoinColumn()
  user: UserAccountEntity;

  @ManyToOne(() => RoomWebsocketEntity, (room) => room.joinedUsers)
  @JoinColumn()
  room: RoomWebsocketEntity;
}
