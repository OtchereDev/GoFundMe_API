import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCreateSerializer } from 'src/user/types/UserSerializer.type';
import { UserService } from 'src/user/user.service';
import { AuthDTO } from './dto/auth.dto';
import { JwtDTO } from './dto/jwt.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthType } from './types/auth.type';
import { TokenType } from './types/token.type';

import { OAuth2Client } from 'google-auth-library';
import { UserRepository } from 'src/user/entity/user.repo';
import config from 'src/config/config';
const client = new OAuth2Client(process.env.ClientID)

@Injectable()
export class AuthService {
    constructor(private userService:UserService,
                private jwtService:JwtService,
                private userRepository:UserRepository){}

    async validateUser(user_data:AuthDTO): Promise<UserCreateSerializer|null> {
        const user = await this.userService.getUser(user_data);
        
        return user;
    }

 
    async refreshToken(body:JwtDTO) : Promise<TokenType>{

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


    async login(user:UserCreateSerializer):Promise<AuthType>{
        const payload={email:user.email,sub:user.id}



        return {
            access_token:this.jwtService.sign(payload,{
                expiresIn:'180s'
            }),
            refresh_token:this.jwtService.sign({...payload,refresh:true})
        }

    }

    async customGoogleLogin(body:any):Promise<AuthType>{
        
        const { token }  = body
        
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.ClientID
        });
        
        const { name, email, picture, ...rest } = ticket.getPayload(); 

        let checkUser=await this.userRepository.findOne({email})
        
        let payload;
        
        if (!checkUser){
            const newUser = await this.userRepository.createUser({email,
                                                fullName:name, 
                                                password:config.socialAuthPassword})
            payload={
                email,
                sub:newUser.id
            }
            
        }
        else{

            payload={
               
                email,
                sub:checkUser.id
            }
        }
        
   
    
        return {
            access_token:this.jwtService.sign(payload,{
                expiresIn:'180s'
            }),
            refresh_token:this.jwtService.sign({...payload,refresh:true})
        }
    }
}

