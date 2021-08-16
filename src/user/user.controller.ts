import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserRepository } from './entity/user.repo';
import {UserDTO} from './dto/user.dto'
import { UserService } from './user.service';
import { UserCreateSerializer } from './types/UserSerializer.type';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('Auth')
export class UserController {
    constructor(private userRepository:UserRepository,
                private userService:UserService){}

    @Get()
    async handleGet() : Promise<User[]>{
        const users = await this.userRepository.find({})
      
        return users
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
