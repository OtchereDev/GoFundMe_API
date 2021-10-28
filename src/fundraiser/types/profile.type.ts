import { ApiProperty } from "@nestjs/swagger"
import { Fundraiser } from "../entity/fundraiser.entity"

class ProfileType{
  
  @ApiProperty()
  fundraiser:Fundraiser[]

  @ApiProperty()
  email:string

}

export default ProfileType