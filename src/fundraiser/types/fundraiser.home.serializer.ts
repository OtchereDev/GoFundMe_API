import {ApiProperty} from '@nestjs/swagger'


export class FundraiserHomeSerializer{

    @ApiProperty()
    image_url:string

    @ApiProperty()
    title:string

    @ApiProperty()
    goal_amount:number

    @ApiProperty()
    country:string

    @ApiProperty()
    last_donation_time?:Date

    @ApiProperty()
    description:string

    @ApiProperty()
    amountRaised:number

}