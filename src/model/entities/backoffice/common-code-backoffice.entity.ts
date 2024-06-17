import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, OneToMany } from 'typeorm';
import { ReportEntity } from '../video/report.entity';

@Entity()
@Unique(['code'])
export class CommonCodeEntity {
  @PrimaryGeneratedColumn()
  id!: number; // 공통코드 아이디

  @Column()
  groupCode: string; // 공통코드 코드

  @Column()
  code: string;

  @Column()
  name: string; // 공통코드 이름

  @Column()
  isDeleted: boolean; // 삭제 여부

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @OneToMany(() => CommonCodeEntity, (commonCode) => commonCode.code)
  // commonCodes: CommonCodeEntity[];

  @OneToMany(() => ReportEntity, (report) => report.commoncode)
  reports: ReportEntity[];
}
