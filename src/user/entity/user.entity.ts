import { Fundraiser } from 'src/fundraiser/entity/fundraiser.entity';
import { Entity, Column, PrimaryGeneratedColumn,BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({
    unique:true
  })
  email:string

  @Column()
  password:string

  @OneToMany(()=>Fundraiser,fundraiser=>fundraiser.organiser,{
    nullable:true
  })
  fundraisers:Fundraiser[]

  @CreateDateColumn()
  createdAt:Date

  @UpdateDateColumn()
  updatedAt:Date

  @Column({ default: true })
  isActive: boolean;
}