import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';

import { UserRepository } from './entity/user.repo';
import { UserCreateSerializer } from './types/UserSerializer.type';
import {AuthDTO} from '../auth/dto/auth.dto'
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(private userRepository:UserRepository){}

    async getUser(user:AuthDTO) :Promise<UserCreateSerializer|null>{
        return await this.userRepository.findOneUser(user)
    }

    async createUser(user_data:UserDTO) : Promise<UserCreateSerializer>{
        const user = await this.userRepository.createUser(user_data)

        return user

    }

}
