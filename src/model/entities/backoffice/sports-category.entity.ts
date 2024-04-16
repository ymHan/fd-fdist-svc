import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class SportsCategoryEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code: string;

  @Column()
  name_eng: string;

  @Column()
  name_kor: string;

  @Column()
  name_jpn: string;

  @CreateDateColumn()
  createdAt: Date;
}
