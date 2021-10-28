import { ApiProperty } from '@nestjs/swagger'
import {IsAlpha, IsNotEmpty, IsNumber, IsUUID, Min} from 'class-validator'

export class Charge{

    @IsNumber({},{
        message:'please provide a valid numeric amount'
    })
    @Min(5,{
        message:'mininmum amount is $5'
    })
    @ApiProperty({
        description:"Amount being donated"
    })
    amount:number

    @IsNumber({},{
        message:'please provide a valid numeric amount'
    })
    @Min(0,{
        message:'mininmum tip is $0'
    })
    @ApiProperty({
        description:"Tip being offered to us"
    })
    tip:number

    @IsUUID()
    @ApiProperty({
        description:"The id of the fundraiser to which the donation is made to"
    })
    fundraiser_id:string

    // @IsAlpha()
    @IsNotEmpty()
    @ApiProperty({
        description:"Full name of the donor"
    })
    name:string
}