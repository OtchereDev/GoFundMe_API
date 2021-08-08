import { IsEmail, IsNotEmpty,MinLength,Matches } from "class-validator"

export class UserDTO{

    @IsNotEmpty({
        message:'please provide a Full Name'
    })
    fullName:string

    @IsEmail({},{
        message:'please provide a valid email'
    })
    email:string

    @MinLength(6,{
        'message':'mininum length of a password is 6'
    })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/,{
        message:'please provide a strong password'
    })
    password:string

}