import { Controller,Post, UseGuards, Request, Get, ValidationPipe,Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LocalGuard } from './local-auth.guard';
import { JwtGuard } from './jwt-auth.guard';
import { JwtDTO } from './dto/jwt.dto';
import {  GoogleGuard } from './google-auth.guard';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { TokenType } from './types/token.type';
import { AuthType } from './types/auth.type';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @UseGuards(LocalGuard)
    @Post('/login')
    async login(@Request() req):Promise<AuthType>{
        return this.authService.login(req.user)
    }

    @UseGuards(GoogleGuard)
    @Get('/login/google')
    async googleLogin(@Request() req){
        // return req.user
    }

    @UseGuards(GoogleGuard)
    @Get('/google/callback')
    @ApiExcludeEndpoint()
    async googleCallbackLogin(@Request() req):Promise<AuthType>{
        const data=await this.authService.login(req.user)
      
        return data
    }


    @Post('/refresh_token')
    @UsePipes(ValidationPipe)
    async refreshToken(@Body() body:JwtDTO):Promise<TokenType>{
        const verify_jwt = this.authService.refreshToken(body)

        return verify_jwt


    }

    
}
