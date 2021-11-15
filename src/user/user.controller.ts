import { Body, Controller, Post, Get, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserRepository } from './entity/user.repo';
import {UserDTO} from './dto/user.dto'
import { UserService } from './user.service';
import { UserCreateSerializer } from './types/UserSerializer.type';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { Fundraiser } from 'src/fundraiser/entity/fundraiser.entity';
import ProfileType from 'src/fundraiser/types/profile.type';

@Controller('user')
@ApiTags('Auth')
export class UserController {
    constructor(private userRepository:UserRepository,
                private userService:UserService){}

    @Post()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async handleGetUser(@Req() req) {
        const {email}= req.user
        
        const user = await this.userRepository.getUser(email)
      
        return user
    }

    @Get("/profile")
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({type:ProfileType})
    async handleProfile(@Req() req):Promise<{fundraisers:Fundraiser[],email:string}>{
        const {email}=req?.user
        

        return this.userService.getProfile(email)
    }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    @ApiBody({type:[UserDTO]})
    @ApiCreatedResponse({description:"User created",type:UserCreateSerializer})
    async handleCreateUser(@Body() body:UserDTO):Promise<UserCreateSerializer>{
        const user = this.userService.createUser(body)
       
        return  user

    }
}
