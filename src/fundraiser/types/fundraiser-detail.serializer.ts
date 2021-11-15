import { ApiProperty } from "@nestjs/swagger";
import { Donation } from "src/payments/entity/donation.entity";
import { Fundraiser } from "../entity/fundraiser.entity";

type categoryType = {
    id:string,
    name: string
}

export class FundDetailSerializer {

    @ApiProperty()
    id:string

    @ApiProperty()
    category:categoryType

    @ApiProperty()
    title:string

    @ApiProperty()
    description:string

    @ApiProperty()
    beneficiary:string

    @ApiProperty()
    donations:Donation[]

    @ApiProperty()
    goal_amount:number
    organiser:string | {fullName:string,email:string}

    @ApiProperty()
    country:string

    @ApiProperty()
    createdAt:Date

    @ApiProperty()
    amountRaised:number

    @ApiProperty()
    no_of_donors:number

    @ApiProperty()
    image_url:string
}