import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserInput } from "../dto/user.input";
import { UserObject } from "../models/users.models";
import { UserService } from "../user.service";

@Resolver(of=>UserObject)
export class UserResolver{
  constructor(private userService:UserService){}

  @Mutation(returns=>UserObject, {nullable:true})
  async createUser(_parent:any, @Args({type: ()=>UserInput}) {input}:UserInput){
    const user = await this.userService.createUser(input)
    return {
      ...user,
      ...input
    }
  }
}