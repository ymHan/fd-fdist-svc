import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CustomerBackofficeEntity } from '@entities/backoffice/customer-backoffice.entity';
import { SectorVenueBackofficeEntity } from '@entities/backoffice/sector-venue-backoffice.entity';

@Entity()
export class VenueBackofficeEntity {
  @PrimaryColumn({ type: 'varchar', length: 4 })
  id: string;

  @Column()
  countryId: number;

  @Column()
  stateId: number;

  @Column()
  cityId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'bool', nullable: false, default: false })
  isDeleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  public updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  public deletedAt: Date;

  @ManyToOne(() => CustomerBackofficeEntity, (venue) => venue.venues)
  @JoinColumn()
  venue: CustomerBackofficeEntity;

  @OneToMany(() => SectorVenueBackofficeEntity, (sector) => sector.venues)
  sectors: SectorVenueBackofficeEntity[];
}
