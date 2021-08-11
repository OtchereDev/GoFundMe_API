import { Body, Controller, Get, Post, ValidationPipe, UsePipes, UseInterceptors, UploadedFile, Param, } from '@nestjs/common';
import { FundraiserDTO } from './dto/fundraiser.dto';
import { Fundraiser } from './entity/fundraiser.entity';
import { FundraiserService } from './fundraiser.service';
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { imageStorage } from 'src/config/multer.storages';
import { ParamInterceptor } from './params.interceptor';



@Controller('fundraiser')
export class FundraiserController {

    constructor(private fundraiserService:FundraiserService){}

    @Get()
    async getAllFundraiser():Promise<Fundraiser[]>{
        return await this.fundraiserService.getAllFundraiser()
    }

    @Post('/create')
    @UsePipes(ValidationPipe)
    async createFundraiser(@Body() body:FundraiserDTO):Promise<Fundraiser>{
        return await this.fundraiserService.createFundraiser(body)
    }

    @Post('/upload/image/:id')
    @UseInterceptors(ParamInterceptor,FileInterceptor('image',{storage:imageStorage}))
    async addImageToFundraiser(@UploadedFile() image:Express.Multer.File, @Param('id') id:string):Promise<void>{
        
        return await  this.fundraiserService.addImageToFundraiser(image.path,id)
    }

    @Get('/loc/:location')
    async filterFundraiserByLoc(@Param('location') loc:string):Promise<Fundraiser[]>{
        return await this.fundraiserService.filterFundraiserByLoc(loc)
    }

    @Get()
    filterFundraiserByCategory(){

    }

    @Get()
    searchForFundraiser(){

    }




}
