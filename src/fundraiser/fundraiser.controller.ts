import { Body, Controller, Get, Patch, Post, ValidationPipe, UsePipes, } from '@nestjs/common';
import { FundraiserDTO } from './dto/fundraiser.dto';
import { Fundraiser } from './entity/fundraiser.entity';
import { FundraiserService } from './fundraiser.service';

@Controller('fundraiser')
export class FundraiserController {

    constructor(private fundraiserService:FundraiserService){}

    @Get()
    getAllFundraiser():Promise<Fundraiser[]>{
        return this.fundraiserService.getAllFundraiser()
    }

    @Post('/create')
    @UsePipes(ValidationPipe)
    createFundraiser(@Body() body:FundraiserDTO):Promise<Fundraiser>{
        return this.fundraiserService.createFundraiser(body)
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
