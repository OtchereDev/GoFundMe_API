import { Fundraiser } from 'src/fundraiser/entity/fundraiser.entity'
import { BaseEntity, Entity,Column, PrimaryGeneratedColumn,ManyToOne, CreateDateColumn } from 'typeorm'


@Entity()
export class Donation extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    // PaymentIntent

    @Column()
    name:string

    @ManyToOne(()=>Fundraiser, fundraiser=>fundraiser.donations)
    fundraiser:Fundraiser

    @Column({
        type:'double'
    })
    amount:number

    @Column({
        type:'text',
        nullable:true
    })
    comment:string

    @CreateDateColumn()
    createdAt:Date
}