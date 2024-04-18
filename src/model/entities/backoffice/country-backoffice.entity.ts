import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CountryBackofficeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'char', length: 2 })
  iso: string;

  @Column({ type: 'varchar', length: 80})
  name: string;

  @Column({ type: 'varchar', length: 80})
  nicename: string;

  @Column({ type: 'char', length: 3, nullable: true })
  iso3: string;

  @Column({ type: 'int2', nullable: true })
  numcode: number;

  @Column({ type: 'int4' })
  phonecode: number;
}