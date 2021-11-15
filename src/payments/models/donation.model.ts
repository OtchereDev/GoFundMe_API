import {ObjectType, Field,ID,Float} from '@nestjs/graphql'
import { Fundraiser } from 'src/fundraiser/entity/fundraiser.entity'
import { FundraiserObject } from 'src/fundraiser/models/fundraiser.model'

@ObjectType()
export class DonationObject{

  @Field(type=>ID)
  id:string

  @Field()
  name:string

  @Field(type=>FundraiserObject)
  fundraiser:Fundraiser

  @Field(type=>Float)
  amount:number

  @Field()
  comment:string

  @Field()
  createdAt:Date
}