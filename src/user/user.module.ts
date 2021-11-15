import { Module } from '@nestjs/common';
import {TypeOrmModule } from '@nestjs/typeorm'
import {User} from './entity/user.entity'
import { UserRepository } from './entity/user.repo';
import { UserResolver } from './resolvers/users.resolver';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports:[TypeOrmModule.forFeature([User,UserRepository])],
    controllers: [UserController],
    providers: [UserService, UserResolver],
    exports:[UserService,TypeOrmModule]
})
export class UserModule {}
