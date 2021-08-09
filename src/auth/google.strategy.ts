import {PassportStrategy} from '@nestjs/passport'
import {Strategy,VerifyCallback} from 'passport-google-oauth20'
import {Injectable} from '@nestjs/common'
import config from 'src/config/config'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy,'google'){
    constructor(){
        super({
            clientID:config.clientId,
            clientSecret:config.clientSecret,
            callbackURL:'http://localhost:3000/auth/google/callback/',
            scope:['email','profile'],
        })
    }

    async validate(access_token:string,refresh_token:string,profile:any,done:VerifyCallback){
        
        const {name,email,picture}=profile._json

        const user={
            name,
            email,
            picture
        }

        done(null,user)

    }
}