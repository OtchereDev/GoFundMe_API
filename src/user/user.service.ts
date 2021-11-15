import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';

import { UserRepository } from './entity/user.repo';
import { UserCreateSerializer } from './types/UserSerializer.type';
import {AuthDTO} from '../auth/dto/auth.dto'
import { Fundraiser } from 'src/fundraiser/entity/fundraiser.entity';

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

    async getProfile(email:string):Promise<{fundraisers:Fundraiser[],email:string}>{
        // const user_profile=await this.userRepository.findOne({email})
        const user_profile=await this.userRepository.findOne({id:1})

        return {
            fundraisers: user_profile.fundraisers || [],
            email: user_profile.email
        }
    }
}
