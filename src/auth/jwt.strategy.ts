import {Strategy,ExtractJwt} from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import config from 'src/config/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey : config.jwtSecret
        })

    }

    async validate(payload:any){
        if (payload.refresh){
            throw new UnauthorizedException('invalid jwt')
        }
        return {
            userId:payload.sub,
            email:payload.email
        }
    }
}