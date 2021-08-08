import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCreateSerializer } from 'src/user/types/UserSerializer.type';
import { UserService } from 'src/user/user.service';
import { AuthDTO } from './dto/auth.dto';
import { JwtDTO } from './dto/jwt.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService:UserService,
                private jwtService:JwtService){}

    async validateUser(user_data:AuthDTO): Promise<UserCreateSerializer|null> {
        const user = await this.userService.getUser(user_data);
        
        return user;
    }

 
    async refreshToken(body:JwtDTO){

        try {
            
            const verify_jwt = this.jwtService.verify(body.refresh_token)

            if (verify_jwt && !verify_jwt.refresh){
                throw new UnauthorizedException('provide valid refresh jwt')
            }

            const access_token=this.jwtService.sign({
                email:verify_jwt.email,
                sub:verify_jwt.sub
            })
    
            return {access_token}
        } catch (error) {
           
            if (error.name==='JsonWebTokenError'){
                throw new UnauthorizedException('Invalid jwt')

            }

            if (error.name==='TokenExpiredError'){
                throw new UnauthorizedException('Expired jwt')
            }

            const message=error.message ?error.message:''

            throw new UnauthorizedException(message)
        }
    }


    async login(user:UserCreateSerializer){
        const payload={email:user.email,sub:user.id}



        return {
            access_token:this.jwtService.sign(payload,{
                expiresIn:'180s'
            }),
            refresh_token:this.jwtService.sign({...payload,refresh:true})
        }

    }
}

