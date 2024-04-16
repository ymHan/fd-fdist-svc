import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number; // 카테고리 아이디

  @Column()
  name: string; // 카테고리 이름

  @Column()
  code: string; // 카테고리 코드

  @Column()
  description: string; // 카테고리 설명

  @CreateDateColumn({ type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
