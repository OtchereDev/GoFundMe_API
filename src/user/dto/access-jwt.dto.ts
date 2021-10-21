import { ApiProperty } from '@nestjs/swagger'
import {IsJWT, IsNotEmpty} from 'class-validator'

export class AccessJwtDTO {

    @IsNotEmpty()
    @IsJWT()
    @ApiProperty()
    access_token:string
    
    
}