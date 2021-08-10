import { Injectable } from '@nestjs/common';
import { FundraiserRepository } from './entity/fundraiser.repo';

@Injectable()
export class FundraiserService {

    constructor(private fundraiserRepo:FundraiserRepository){}

    getAllFundraiser(){

    }

  
    createFundraiser(){

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
