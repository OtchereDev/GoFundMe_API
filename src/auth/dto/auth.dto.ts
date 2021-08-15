import { ApiProperty } from '@nestjs/swagger'
import {IsEmail, IsNotEmpty, } from 'class-validator'

export class AuthDTO{

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email:string

    @IsNotEmpty()
    @ApiProperty()
    password:string
}