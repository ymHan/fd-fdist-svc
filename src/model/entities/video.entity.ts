import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class System extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()


  @OneToMany(() => User, (user) => user.id)
  userId: User[];
}