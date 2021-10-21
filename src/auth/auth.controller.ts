import { Controller,Post, UseGuards, Request, Get, ValidationPipe,Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LocalGuard } from './local-auth.guard';
import { JwtGuard } from './jwt-auth.guard';
import { JwtDTO } from './dto/jwt.dto';
import {  GoogleGuard } from './google-auth.guard';
import { ApiBody, ApiExcludeEndpoint, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TokenType } from './types/token.type';
import { AuthType } from './types/auth.type';
import { AuthDTO } from './dto/auth.dto';
import { googleId } from './types/google-token.type';


@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor(private authService:AuthService,){}

    @Post("/v1/google/login")
    @ApiOkResponse({type:AuthType,description:"Tokens for authentication"})
    async loginWithGoogle(@Body() body:any):Promise<AuthType>{
        return this.authService.customGoogleLogin(body)
    }

    @UseGuards(LocalGuard)
    @Post('/login')
    @ApiBody({type:AuthDTO})
    @ApiOkResponse({type:AuthType,description:"Tokens for authentication"})
    async login(@Request() req):Promise<AuthType>{
        return this.authService.login(req.user)
    }

    @UseGuards(GoogleGuard)
    @Get('/login/google')
    @ApiExcludeEndpoint()
    async googleLogin(@Request() req){
        // return req.user
    }

    @UseGuards(GoogleGuard)
    @Get('/google/callback')
    @ApiQuery({name:"token_id",description:'Google authentication token',type:googleId})
    @ApiOkResponse({type:AuthType,description:"Tokens for authentication"})
    async googleCallbackLogin(@Request() req):Promise<AuthType>{
        const data=await this.authService.login(req.user)
      
        return data
    }


    @Post('/refresh_token')
    @UsePipes(ValidationPipe)
    @ApiBody({type:JwtDTO})
    @ApiOkResponse({type:AuthType,description:"Refresh token "})
    async refreshToken(@Body() body:JwtDTO):Promise<TokenType>{
        const verify_jwt = this.authService.refreshToken(body)

        return verify_jwt


    }

    
}
