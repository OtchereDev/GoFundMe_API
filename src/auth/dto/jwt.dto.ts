import { ApiProperty } from '@nestjs/swagger'
import {IsJWT, IsNotEmpty} from 'class-validator'

export class JwtDTO {

    @IsNotEmpty()
    @IsJWT()
    @ApiProperty()
    refresh_token:string
    
    
}