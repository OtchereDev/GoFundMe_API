import { ApiProperty } from "@nestjs/swagger";
import { Donation } from "src/payments/entity/donation.entity";

export class FundDetailSerializer {

    @ApiProperty()
    id:string

    @ApiProperty()
    category:string[]

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