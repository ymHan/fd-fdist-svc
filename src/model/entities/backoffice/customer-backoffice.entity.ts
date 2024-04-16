import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { VenueBackofficeEntity } from './venue-backoffice.entity';

@Entity()
export class CustomerBackofficeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({ name: 'create_at', default: () => 'CURRENT_TIMESTAMP', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => VenueBackofficeEntity, (venue) => venue.venue)
  venues: VenueBackofficeEntity[];
}
