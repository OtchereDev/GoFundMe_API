import { ApiProperty } from '@nestjs/swagger'
import {Length} from 'class-validator'

export class CommentDTO {
    @Length(1,400)
    @ApiProperty()
    message:string
}