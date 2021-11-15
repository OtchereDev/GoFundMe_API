import { BaseEntity,Entity,Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm'
import { Fundraiser } from './fundraiser.entity'
import { Field } from '@nestjs/graphql'


@Entity()
export class Category extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
        length:20
    })
    name:string

    @OneToMany(()=>Fundraiser,fundraiser=>fundraiser.category,{
        nullable:true
    })
    fundraisers:Fundraiser[]

}