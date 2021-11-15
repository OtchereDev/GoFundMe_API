import {ArgsType, Field, } from "@nestjs/graphql"
import { Type } from "class-transformer"
import { ValidateNested } from "class-validator"
import { FundraiserDTO } from "../dto/fundraiser.dto"


@ArgsType()
export class FundraiserCreateInput{

  @Field(()=>FundraiserDTO)
  @Type(()=>FundraiserDTO)
  @ValidateNested()
  input!:FundraiserDTO

}