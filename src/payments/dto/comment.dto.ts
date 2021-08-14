import {Length} from 'class-validator'

export class CommentDTO {
    @Length(1,400)
    message:string
}