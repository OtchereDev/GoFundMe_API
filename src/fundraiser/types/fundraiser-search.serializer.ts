import { ApiProperty } from "@nestjs/swagger"

export class FundSearchSerializer{

    @ApiProperty()
    id:string

    @ApiProperty()
    country:string

    @ApiProperty()
    title:string

    @ApiProperty()
    organiser:{
       
        fullName:string
    }

    @ApiProperty()
    image_url:string
}