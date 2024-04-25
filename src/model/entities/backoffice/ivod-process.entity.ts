import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ivod_process_entity {
  @PrimaryGeneratedColumn()
  id: number; // 아이보드 프로세스 아이디

  @Column({ nullable: true })
  filename: string;

  @Column({ nullable: true })
  filepath: string;

  @Column({ nullable: true })
  returnapi: string;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdat: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
  updatedat: Date;
}
