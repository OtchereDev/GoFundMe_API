import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm'
import { Donation } from './donation.entity'

@Entity()
export class PaymentIntent extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    intent_id:string

    @Column()
    fundraiser_id:string

    @Column({
        type: "double precision",
        // precision:2
    })
    amount:number

    @Column({
        type:"float",
        default:0    
    })
    tip:number

}