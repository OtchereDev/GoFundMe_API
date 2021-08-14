import {IsAlpha, IsNotEmpty, IsNumber, IsUUID, Min} from 'class-validator'

export class Charge{

    @IsNumber({},{
        message:'please provide a valid numeric amount'
    })
    @Min(5,{
        message:'mininmum amount is $5'
    })
    amount:number

    @IsUUID()
    fundraiser_id

    @IsAlpha()
    @IsNotEmpty()
    name:string
}