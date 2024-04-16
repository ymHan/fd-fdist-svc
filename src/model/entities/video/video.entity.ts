import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { UserAccountEntity, LikeEntity, ReportEntity, CommonCode } from '@/model/entities';

@Entity()
export class VideoEntity {
  @PrimaryGeneratedColumn()
  id: number; // 비디오 아이디

  @Column()
  tempId: string; // 비디오 임시 아이디

  @Column()
  nodeId: string; // 노드 아이디

  @Column({ nullable: true })
  title: string; // 비디오 제목

  @Column({ nullable: true })
  sub_title: string; // 비디오 부제목

  @Column({ nullable: true })
  description: string; // 비디오 설명

  @Column({ nullable: true })
  recordType: string; // 비디오 녹화 타입

  @Column({ nullable: true })
  url: string; // 비디오 URL

  @Column({ nullable: true })
  file_path: string; // 비디오 파일 경로

  @Column('text', { array: true, nullable: true })
  video_files: string[]; // 비디오 파일

  @Column('text', { array: true, nullable: true })
  meta: string[]; // 비디오 메타데이터

  @Column('text', { array: true, nullable: true })
  channelList: string[]; // 비디오 채널 리스트

  @Column('text', { array: true, nullable: true })
  thumbnail: string[]; // 비디오 썸네일 파일명, 여러개 추출이 가능하다.

  @Column({ nullable: true })
  duration: string; // 비디오 길이 3 way인 경우 파일이 3개이지만 길이는 모두 동일하기 때문에 하나만 값을 추출한다.

  @Column({ default: 0 })
  view_count: number; // 비디오 조회수

  @Column({ default: 0 })
  like_count: number; // 비디오 좋아요 수

  @Column({ default: 0 })
  dislikeCount: number; // 비디오 싫어요 수

  @Column({ default: 0 })
  shareCount: number; // 비디오 공유 수

  @Column({ default: 0 })
  downloadCount: number; // 비디오 다운로드 수

  @Column({ default: 0 })
  reportCount: number; // 비디오 신고 수

  @Column({ default: 0 })
  commentCount: number; // 비디오 댓글 수

  @Column({ type: 'boolean', default: false })
  isPublic: boolean; // 비디오 공개 여부

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean; // 비디오 삭제 여부

  @Column({ type: 'boolean', default: false })
  isStatus: boolean; // 비디오 상태, 최초 등록시는 임시 이므로 false, 정상적으로 업로드된다면 true로 변경

  @CreateDateColumn()
  createdAt: Date; // 생성일

  @UpdateDateColumn()
  updatedAt: Date; // 수정일

  @DeleteDateColumn()
  deletedAt: Date; // 삭제일

  @ManyToOne(() => UserAccountEntity, (user) => user.videos)
  @JoinColumn()
  user: UserAccountEntity;

  @OneToMany(() => LikeEntity, (like) => like.video)
  likes: LikeEntity[];

  @OneToMany(() => ReportEntity, (report) => report.video)
  reports: ReportEntity[];

  @ManyToOne(() => CommonCode, (commonCode) => commonCode.code)
  @JoinColumn({ name: 'category', referencedColumnName: 'code' })
  category: CommonCode;

  @ManyToOne(() => CommonCode, (commonCode) => commonCode.code)
  @JoinColumn({ name: 'categorySub', referencedColumnName: 'code' })
  categorySub: CommonCode;

  @ManyToOne(() => CommonCode, (commonCode) => commonCode.code)
  @JoinColumn({ name: 'categorySubCode', referencedColumnName: 'code' })
  categorySubCode: CommonCode;
}
