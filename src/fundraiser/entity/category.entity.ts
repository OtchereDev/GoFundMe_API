import { BaseEntity,Entity,Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Fundraiser } from './fundraiser.entity'


@Entity()
export class Category extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
        length:20
    })
    name:string

    @ManyToMany(()=>Fundraiser,fundraiser=>fundraiser.category)
    fundraisers:Fundraiser[]

}