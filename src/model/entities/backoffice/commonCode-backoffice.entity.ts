import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from 'typeorm';

@Entity()
@Unique(['code'])
export class CommonCode {
  @PrimaryGeneratedColumn()
  id!: number; // 공통코드 아이디

  @Column()
  group_code: string; // 공통코드 코드

  @Column()
  code: string;

  @Column()
  name: string; // 공통코드 이름

  @Column()
  is_deleted: boolean; // 삭제 여부

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  created_by_id: number;

  @Column()
  updated_by_id: number;

  @OneToMany(() => CommonCode, (commonCode) => commonCode.code)
  commonCodes: CommonCode[];
}
