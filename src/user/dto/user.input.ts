import { ArgsType, Field } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { UserDTO } from "./user.dto";

@ArgsType()
export class UserInput{

  @Field(()=>UserDTO)
  @Type(()=> UserDTO)
  @ValidateNested()
  input!:UserDTO

}