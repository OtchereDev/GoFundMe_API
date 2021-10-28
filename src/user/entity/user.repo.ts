import { BadRequestException, UnauthorizedException } from "@nestjs/common";

import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt'


import { User } from "./user.entity";
import { UserDTO } from "../dto/user.dto";
import { UserCreateSerializer } from "../types/UserSerializer.type";
import config from '../../config/config'
import { AuthDTO } from "src/auth/dto/auth.dto";


@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async findOneUser(user_data:AuthDTO) : Promise<UserCreateSerializer |null>{
        const user = await this.find({where:{email:user_data.email}, select:["email","password","id"]})

        if (user.length===0){
            return null
        }

        const checkPassword= await bcrypt.compare(user_data.password,user[0].password)

        if (!checkPassword){
            return null
        }

        return {
            email:user[0].email,
            // isActive:user[0].isActive,
            id:user[0].id
        }


    }

    async getUser(email) {

        try {
            
            const query = await this.findOneOrFail({email})
    
            return {
                email,
                full_name: query.fullName,
                id:query.id
    
            }
        } catch (error) {
            throw new UnauthorizedException()
        }

    }

    async createUser(user:UserDTO) :Promise<UserCreateSerializer> {

        try {
            const password= await bcrypt.hash(user.password,config.saltRounds)
            const new_user = this.create({...user,password})
            
            await new_user.save()
            
            return {
                email:new_user.email,
                // isActive:new_user.isActive,
                id:new_user.id,
            }
            
        } catch (error) {
            // console.log(error)
            let message:string = 'Sorry, could not complete signup';

            // change error code to reflect db used in prod
            if(error.name==='QueryFailedError'&& error.errno===19){
                message=`this ${user.email} is already in use.`
            }
            throw new BadRequestException(message)
        }
    } 
    
    
}