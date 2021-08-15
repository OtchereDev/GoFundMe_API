import { ApiProperty } from '@nestjs/swagger'
import { IsAlpha, IsNotEmpty, Length, Max, Min } from 'class-validator'

export class FundraiserDTO{

    @IsNotEmpty()
    @IsAlpha()
    @ApiProperty()
    category:string

    @IsNotEmpty()
    @Length(5,150)
    @ApiProperty()
    title:string

    @IsNotEmpty()
    @ApiProperty()
    description:string

    @IsNotEmpty()
    @Length(2,100)
    @IsAlpha()
    @ApiProperty()
    beneficiary:string

    @IsNotEmpty()
    @Min(100)
    @Max(1000000)
    @ApiProperty()
    goal_amount:number

    @IsNotEmpty()
    @IsAlpha()
    @ApiProperty()
    country:string
}