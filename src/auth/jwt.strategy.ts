import {Strategy,ExtractJwt} from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import config from 'src/config/config'
import { UserRepository } from 'src/user/entity/user.repo'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private userRepo:UserRepository){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey : config.jwtSecret
        })

    }

    async validate(payload:any){

        const checkUser=this.userRepo.findOne({email:payload.email})
        if (payload.refresh) throw new UnauthorizedException('invalid jwt')
        if (!checkUser) throw new UnauthorizedException('User does not exit')
        return {
            userId:payload.sub,
            email:payload.email
        }
    }
}