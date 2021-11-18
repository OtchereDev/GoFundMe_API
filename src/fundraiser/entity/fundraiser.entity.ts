import { Donation } from 'src/payments/entity/donation.entity'
import { Story } from 'src/story/entity/story.entity'
import { User } from 'src/user/entity/user.entity'
import { Entity,Column, BaseEntity, PrimaryGeneratedColumn, JoinTable, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { Category } from './category.entity'

@Entity()
export class Fundraiser extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string


    @ManyToOne(()=>Category, category=>category.fundraisers)
    category:Category

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
        eager:true,
    })
    @JoinColumn()
    donations:Donation[]

    @Column({
        type: "double precision",
        // precision:2
    })
    goal_amount:number

    @OneToOne(()=>Story,story=>story.fundraiser,{
        nullable:true
    })
    story:Story

    
    @ManyToOne(()=>User,user=>user.fundraisers,{
        eager:true
    })
    organiser:User

    @Column({
        length:20
    })
    country:string
  
    

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date


    async amountRaised():Promise<number>{
        let amount=0
        

        const donations =await Donation.find({where:{fundraiser:this},relations:["fundraiser"],order:{createdAt:"DESC"}})

        donations?.forEach(donation=>{
            amount+=donation.amount
        })

        return amount
    }

    no_of_donors():number{
         return this.donations? this.donations.length : 0
    }

    async last_donation_time():Promise<Date>{
        const donations =await Donation.find({where:{fundraiser:this},relations:["fundraiser"],order:{createdAt:"DESC"}})
        
        return donations[0]?.createdAt
    }

    getBrief():string{
        return this.description.slice(0,200)
    }
}