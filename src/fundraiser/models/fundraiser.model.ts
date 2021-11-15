import {ObjectType, Field, ID, Int, Float} from '@nestjs/graphql'
import { CategoryObject } from 'src/category/models/category.model'
import { Donation } from 'src/payments/entity/donation.entity'
import { DonationObject } from 'src/payments/models/donation.model'
import { User } from 'src/user/entity/user.entity'
import { MinimalUser, UserObject } from 'src/user/models/users.models'
import { Category } from '../entity/category.entity'

@ObjectType()
export class FundraiserObject{
  @Field(type=>ID)
  id:string

  @Field(type=>CategoryObject)
  category:Category

  @Field()
  title:string

  @Field()
  description:string

  @Field()
  image_url:string

  @Field({nullable:true})
  beneficiary:string

  @Field(type=>[DonationObject])
  donations:Donation[]

  @Field(type=>Int)
  goal_amount:number

  // @Field(type=> [StoryObject])
  // story

  @Field(type=>UserObject)
  organiser:User

  @Field()
  country:string

  @Field()
  createdAt:Date

  @Field()
  updatedAt:Date

  @Field({nullable:true})
  last_donation_time:Date

  @Field(()=>Float)
  amountRaised:number

  @Field()
  briefDescription:string

  @Field(()=>Int)
  no_of_donors:number
}

@ObjectType()
export class MinimalFundraiser{

  @Field(type=>ID)
  id:string

  @Field(type=>CategoryObject)
  category:Category

  @Field()
  title:string

  @Field()
  image_url:string

  @Field(type=>MinimalUser)
  organiser:MinimalUser

  @Field()
  country:string

}