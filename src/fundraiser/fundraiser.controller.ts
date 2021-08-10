import { Controller, Get, Patch, Post } from '@nestjs/common';
import { FundraiserService } from './fundraiser.service';

@Controller('fundraiser')
export class FundraiserController {

    constructor(private fundraiserService:FundraiserService){}

    @Get()
    getAllFundraiser(){

    }

    @Post()
    createFundraiser(){

    }

    @Patch()
    addImageToFundraiser(){

    }

    @Get()
    filterFundraiserByLoc(){

    }

    @Get()
    filterFundraiserByCategory(){

    }

    @Get()
    searchForFundraiser(){

    }




}
