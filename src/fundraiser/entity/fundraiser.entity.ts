import { Donation } from 'src/payments/entity/donation.entity'
import { User } from 'src/user/entity/user.entity'
import { Entity,Column, BaseEntity, PrimaryGeneratedColumn, JoinTable, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany, ManyToOne } from 'typeorm'
import { Category } from './category.entity'

@Entity()
export class Fundraiser extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string


    @ManyToMany(()=>Category, category=>category.fundraisers,{
        eager:true,

    })
    @JoinTable()
    category:Category[]

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

    @OneToMany(()=>Donation,donation=>donation.fundraiser,{
        nullable:true,
        eager:true
    })
    donations:Donation[]

    @Column({
        type:'double',
        precision:2
    })
    goal_amount:number

    
    @ManyToOne(()=>User,user=>user.fundraisers,{
        eager:true
    })
    organiser:User
  
    

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date


    amountRaised():number{
        let amount=0

        this.donations.forEach(donation=>{
            amount+=donation.amount
        })

        return amount
    }

    no_of_donors():number{
        return this.donations.length
    }
}