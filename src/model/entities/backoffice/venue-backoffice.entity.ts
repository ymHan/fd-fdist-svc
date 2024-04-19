import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CustomerBackofficeEntity, SectorVenueBackofficeEntity } from '@/model/entities';

@Entity()
export class VenueBackofficeEntity {
  @PrimaryColumn({ type: 'varchar', length: 4 })
  id: string;

  @Column({ nullable: true })
  sportsCode: string;

  @Column({ nullable: true })
  countryId: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'bool', nullable: false, default: false })
  isDeleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  public updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  public deletedAt: Date;

  @ManyToOne(() => CustomerBackofficeEntity, (customer) => customer.venues)
  @JoinColumn()
  customer: CustomerBackofficeEntity;

  @OneToMany(() => SectorVenueBackofficeEntity, (sector) => sector.venue)
  @JoinColumn()
  sectors: SectorVenueBackofficeEntity[];
}
