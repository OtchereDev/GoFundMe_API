import { Fundraiser } from 'src/fundraiser/entity/fundraiser.entity'
import { BaseEntity, Entity,Column, PrimaryGeneratedColumn,ManyToOne, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { PaymentIntent } from './payment-intent.entity'


@Entity()
export class Donation extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    // PaymentIntent

    @Column({
        nullable:true
    })
    name:string

    @ManyToOne(()=>Fundraiser, fundraiser=>fundraiser.donations)
    fundraiser:Fundraiser

    @Column({
        type: "double precision",
        // precision:2
    })
    amount:number

    @Column({
        type:'text',
        nullable:true
    })
    comment:string

    @OneToOne(()=>PaymentIntent,)
    @JoinColumn()
    intent:PaymentIntent

    @CreateDateColumn()
    createdAt:Date
}