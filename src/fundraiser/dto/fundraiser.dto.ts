import { ApiProperty } from '@nestjs/swagger'
import { IsAlpha, IsNotEmpty, Length, Max, Min } from 'class-validator'
import {InputType, Field,} from "@nestjs/graphql"
@InputType()
export class FundraiserDTO{

    @IsNotEmpty()
    @IsAlpha()
    @ApiProperty()
    @Field()
    category:string

    @IsNotEmpty()
    @Length(5,150)
    @ApiProperty()
    @Field()
    title:string

    @IsNotEmpty()
    @ApiProperty()
    @Field()
    description:string

    @IsNotEmpty()
    @Length(2,100)
    // @IsAlpha()
    @ApiProperty()
    @Field()
    beneficiary:string

    @IsNotEmpty()
    @Min(100)
    @Max(1000000)
    @ApiProperty()
    @Field()
    goal_amount:number

    @IsNotEmpty()
    @IsAlpha()
    @ApiProperty()
    @Field()
    country:string
}