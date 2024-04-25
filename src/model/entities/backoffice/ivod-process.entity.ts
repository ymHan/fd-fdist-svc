import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ivod_process_entity {
  @PrimaryGeneratedColumn()
  id: number; // 아이보드 프로세스 아이디

  @Column({ nullable: true })
  file_name: string;

  @Column({ nullable: true })
  file_path: string;

  @Column({ nullable: true })
  return_api: string;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
  updatedAt: Date;
}
