import { IsEmail, IsNotEmpty,MinLength,Matches } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Field, InputType } from "@nestjs/graphql"


@InputType()
export class UserDTO{

    @IsNotEmpty({
        message:'please provide a Full Name'
    })
    @ApiProperty({
        description:'full user name'
    })
    @Field()
    fullName:string

    @IsEmail({},{
        message:'please provide a valid email'
    })
    @ApiProperty({
        description:"User email"
    })
    @Field()
    email:string

    @MinLength(8,{
        'message':'mininum length of a password is 8'
    })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&\.^_-]{8,}$/,{
        message:'please provide a strong password'
    })
    @ApiProperty({
        description:'User Strong Password',
    })
    @Field()
    password:string

}