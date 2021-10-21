import { ApiProperty } from "@nestjs/swagger"

export class PaymentInit{


    @ApiProperty()
    clientSecret:string

    @ApiProperty()
    intent_id:string
}