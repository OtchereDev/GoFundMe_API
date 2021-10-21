import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserRepository } from './entity/user.repo';
import {UserDTO} from './dto/user.dto'
import { UserService } from './user.service';
import { UserCreateSerializer } from './types/UserSerializer.type';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt-auth.guard';

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

    @Post('/signup')
    @UsePipes(ValidationPipe)
    @ApiBody({type:[UserDTO]})
    @ApiCreatedResponse({description:"User created",type:UserCreateSerializer})
    async handleCreateUser(@Body() body:UserDTO):Promise<UserCreateSerializer>{
        const user = this.userService.createUser(body)
       
        return  user

    }
}
