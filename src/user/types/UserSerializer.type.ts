import { ApiProperty } from "@nestjs/swagger"

export class  UserCreateSerializer{
    @ApiProperty({
        default:'johndoe@hmail.com'
    })
    email:string


    @ApiProperty({
        default:1
    })
    id:number
}