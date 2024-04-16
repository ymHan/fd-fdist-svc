import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { VideoEntity } from '@entities/video/video.entity';

@Entity()
export class CommonCode {
  @PrimaryGeneratedColumn()
  id!: number; // 공통코드 아이디

  @Column()
  code: string; // 공통코드 코드

  @Column()
  name: string; // 공통코드 이름

  @Column()
  sort: number; // 공통코드 정렬

  @Column()
  group_code: string; // 공통코드 그룹코드

  @Column()
  group_code_name: string; // 공통코드 그룹코드 이름

  @Column()
  sub_code: string; // 공통코드 서브코드

  @Column()
  sub_code_name: string; // 공통코드 서브코드 이름

  @Column()
  code_detail: string; // 공통코드 상세코드

  @Column()
  name_detail: string; // 공통코드 상세코드 이름

  @Column()
  created_by_id: number; // 생성자 아이디

  @Column()
  updated_by_id: number; // 수정자 아이디

  @Column()
  is_deleted: boolean; // 삭제여부

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  published_at: Date;
}
