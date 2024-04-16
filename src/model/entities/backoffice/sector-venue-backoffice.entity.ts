import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { VenueBackofficeEntity } from '@entities/backoffice/venue-backoffice.entity';

@Entity()
export class SectorVenueBackofficeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false, length: 11 })
  nodeId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  public updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  public deletedAt: Date;

  @ManyToOne(() => VenueBackofficeEntity, (venue) => venue.sectors)
  @JoinColumn()
  venues: VenueBackofficeEntity;
}
