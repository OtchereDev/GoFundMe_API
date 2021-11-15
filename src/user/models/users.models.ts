import {ObjectType, ID, Field, Int} from "@nestjs/graphql"
import { Fundraiser } from "src/fundraiser/entity/fundraiser.entity"
import { FundraiserObject } from "src/fundraiser/models/fundraiser.model"

@ObjectType()
export class UserObject{
  @Field(type=>Int)
  id:number

  @Field()
  fullName:string

  @Field()
  email:string

  @Field(type=>[FundraiserObject])
  fundraisers:Fundraiser[]
}

@ObjectType()
export class MinimalUser{
  @Field()
  fullName:string
}