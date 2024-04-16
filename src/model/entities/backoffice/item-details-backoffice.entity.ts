import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ItemDetails {
  @PrimaryGeneratedColumn()
  id: number; // 카테고리 아이디

  @Column({ nullable: true })
  code: string; // 카테고리 코드

  @Column()
  sort: number; // 정렬 순서

  @Column({ nullable: true })
  kr: string; // 한국어

  @Column({ nullable: true })
  en: string; // 영어

  @Column({ nullable: true })
  jp: string; // 일본어

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  published_at: Date;

  @Column()
  created_by_id: number;

  @Column({ nullable: true })
  updated_by_id: number;

  @Column({ nullable: true })
  ctkd: string; // 카테고리 코드
}
