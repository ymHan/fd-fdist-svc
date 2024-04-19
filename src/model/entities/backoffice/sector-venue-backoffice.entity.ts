import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { VenueBackofficeEntity } from '@/model/entities';

@Entity()
export class SectorVenueBackofficeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 3, nullable: true })
  sectorId: string;

  @Column({ type: 'varchar', unique: true, nullable: true, length: 20 })
  nodeId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  public updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  public deletedAt: Date;

  @ManyToOne(() => VenueBackofficeEntity, (venue) => venue.sectors)
  @JoinColumn()
  venue: VenueBackofficeEntity;
}
