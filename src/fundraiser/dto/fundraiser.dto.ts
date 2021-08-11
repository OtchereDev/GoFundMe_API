import { IsAlpha, IsNotEmpty, Length, Max, Min } from 'class-validator'

export class FundraiserDTO{

    @IsNotEmpty()
    @IsAlpha()
    category:string

    @IsNotEmpty()
    @Length(5,150)
    title:string

    @IsNotEmpty()
    description:string

    @IsNotEmpty()
    @Length(2,100)
    @IsAlpha()
    beneficiary:string

    @IsNotEmpty()
    @Min(100)
    @Max(1000000)
    goal_amount:number

    @IsNotEmpty()
    @IsAlpha()
    country:string
}