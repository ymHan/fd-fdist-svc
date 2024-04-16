import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class UserProfileAccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  gender!: string;

  @Column({ type: 'varchar', name: 'photo', nullable: true, length: 255 })
  photo: string;

  @CreateDateColumn({ name: 'create_at', default: () => 'CURRENT_TIMESTAMP', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at', comment: '수정일', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
