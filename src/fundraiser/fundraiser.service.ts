import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { FundraiserDTO } from './dto/fundraiser.dto';
import { Fundraiser } from './entity/fundraiser.entity';
import { FundraiserRepository } from './entity/fundraiser.repo';

@Injectable()
export class FundraiserService {

    constructor(private fundraiserRepo:FundraiserRepository){}

    async getAllFundraiser() :Promise<Fundraiser[]>{
        
        return await this.fundraiserRepo.find()
    }

  
    async createFundraiser(body:FundraiserDTO):Promise<Fundraiser>{
        const user= await User.findOne(1)
        return this.fundraiserRepo.createFundraiser(body,user)
    }

 
    addImageToFundraiser(){

    }

  
    filterFundraiserByLoc(){

    }

   
    filterFundraiserByCategory(){

    }


    searchForFundraiser(){

    }

}
