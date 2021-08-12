import { Fundraiser } from 'src/fundraiser/entity/fundraiser.entity'
import { Entity, BaseEntity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, CreateDateColumn} from 'typeorm'

@Entity()
export class Story extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @OneToOne(()=>Fundraiser,{
        eager:true
    })
    @JoinColumn()
    fundraiser:Fundraiser

    @Column({
        type:'text'
    })
    short_story:string

    @Column({
        length:100
    })
    purpose:string

    @CreateDateColumn()
    createdAt:Date

    generatePurpose():string{
        const organizer = this.fundraiser.organiser.fullName
        const amount = this.fundraiser.amountRaised()
        
        return `${organizer} raised $${amount} to ${this.purpose}`
    }
}