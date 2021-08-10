import { Entity,Column, BaseEntity, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Fundraiser extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
        type:'varchar',
        length:150,  
    })
    title:string

    @Column({
        type:'text'
    })
    description:string

    @Column()
    image_url:string

    @Column({
        length:100
    })
    beneficiary:string

    @Column({
        type:'double',
        precision:2
    })
    goal_amount:number

    @Column({
        type:'double',
        precision:2
    })
    amount_raised:number

    @Column({
        type:'double'
    })
    no_of_donors

    // donors
    // organiser
    // comments
    

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date
}