import { Controller,Post, UseGuards, Request, Get, ValidationPipe,Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LocalGuard } from './local-auth.guard';
import { JwtGuard } from './jwt-auth.guard';
import { JwtDTO } from './dto/jwt.dto';
import {  GoogleGuard } from './google-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @UseGuards(LocalGuard)
    @Post('/login')
    async login(@Request() req){
        return this.authService.login(req.user)
    }

    @UseGuards(GoogleGuard)
    @Get('/login/google')
    async googleLogin(@Request() req){
        // return req.user
    }

    @UseGuards(GoogleGuard)
    @Get('/google/callback')
    async googleCallbackLogin(@Request() req){
        return req.user
    }

    @Get()
    @UseGuards(JwtGuard)
    testJWt(){
        return 'It works'
    }

    @Post('/refresh_token')
    @UsePipes(ValidationPipe)
    async refreshToken(@Body() body:JwtDTO){
        const verify_jwt = this.authService.refreshToken(body)

        return verify_jwt


    }

    
}
