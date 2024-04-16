import { Column, PrimaryGeneratedColumn, BaseEntity, Entity } from 'typeorm';

@Entity()
export class ChannelAccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number; // 채널 아이디

  @Column({ type: 'varchar', length: 255, comment: '채널 이름', nullable: true })
  channelName: string; // 채널 이름

  @Column({ type: 'text', comment: '채널 설명', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, comment: '채널 URL', nullable: true })
  channelUrl: string; // 채널 URL

  @Column({ type: 'varchar', length: 255, comment: '채널 외부 링크', nullable: true })
  link: string; // 외부 링크

  @Column({ type: 'varchar', length: 255, comment: '채널 비즈니스 email', nullable: true })
  businessEmail: string; // 비즈니스 이메일

  @Column({ type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP', comment: '생성일' })
  createdAt: Date;
}
