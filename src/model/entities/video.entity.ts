import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from './user.account.entity';
import {
  Category,
  CategorySubCodeEnum,
  CategorySubEnum,
  RecordType,
} from '@enum/index';

@Entity()
export class Video extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  title: string;

  @Column()
  subTitle: string;

  @Column()
  description: string;

  @Column()
  ownerName: string;

  @Column()
  ownerNickName: string;

  @Column()
  ownerChannelName: string;

  @Column()
  ownerProfileIconUrl? : string | null;

  @Column()
  thumbnailUrl? : string | null;

  @Column({ default: 0 })
  viewCount: number; // 조회수

  @Column({ default: 0 })
  reportsCount: number; // 신고 수

  @Column({ default: 0 })
  likesCount: number; // 좋아요 수

  @Column()
  duration: string;

  @Column({ type: 'enum', name: 'category', enum: Category })
  category: Category;

  @Column({ type: 'enum', name: 'categorySub', enum: CategorySubEnum })
  categorySub: string;

  @Column({ type: 'enum', name: 'categorySubCode', enum: CategorySubCodeEnum })
  categorySubCode: string;

  @Column({ type: 'enum', name: 'recordType', enum: RecordType })
  recordType: string;

  @Column("text", { array: true })
  contentUrlList: string[];

  @Column("text", { array: true })
  poseIndicatorList?: string[] | null;

  @Column()
  nodeId: string;

  @CreateDateColumn({ name: 'created_at', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', comment: '수정일' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', comment: '삭제일' })
  deletedAt?: Date | null;

  @OneToMany(() => User, (user) => user.email)
  userEmail: User[];
}
