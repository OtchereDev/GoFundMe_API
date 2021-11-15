import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Fundraiser } from 'src/fundraiser/entity/fundraiser.entity';
import { FundraiserObject } from 'src/fundraiser/models/fundraiser.model';


@ObjectType()
export class CategoryObject{
  @Field()
  id:string

  @Field()
  name: string

  @Field(type=>[FundraiserObject],{nullable:true})
  fundraisers:Fundraiser[]

}
