import { Body, Controller, Get, Post, ValidationPipe, UsePipes, UseInterceptors, UploadedFile, Param, ParseUUIDPipe, } from '@nestjs/common';
import { FundraiserDTO } from './dto/fundraiser.dto';
import { Fundraiser } from './entity/fundraiser.entity';
import { FundraiserService } from './fundraiser.service';
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { imageStorage } from 'src/config/multer.storages';
import { ParamInterceptor } from './params.interceptor';
import { FundSearchSerializer } from './types/fundraiser-search.serializer';
import { FundDetailSerializer } from './types/fundraiser-detail.serializer';



@Controller('fundraiser')
export class FundraiserController {

    constructor(private fundraiserService:FundraiserService){}

    @Get()
    async getAllFundraiser():Promise<Fundraiser[]>{
        return await this.fundraiserService.getAllFundraiser()
    }

    @Get('/detail/:uuid')
    async getDetailFundraiser(@Param('uuid',ParseUUIDPipe) id:string):Promise<FundDetailSerializer>{
        return await this.fundraiserService.getFundraiserDetail(id)

    }

    @Post('/create')
    @UsePipes(ValidationPipe)
    async createFundraiser(@Body() body:FundraiserDTO):Promise<Fundraiser>{
        return await this.fundraiserService.createFundraiser(body)
    }

    @Post('/upload/image/:id')
    @UseInterceptors(ParamInterceptor,FileInterceptor('image',{storage:imageStorage}))
    async addImageToFundraiser(@UploadedFile() image:Express.Multer.File, @Param('id') id:string):Promise<void>{
        const path ='/media/images/'+image.filename
        return await  this.fundraiserService.addImageToFundraiser(path,id)
    }

    @Get('/loc/:location')
    async filterFundraiserByLoc(@Param('location') loc:string):Promise<FundSearchSerializer[]>{
        return await this.fundraiserService.filterFundraiserByLoc(loc)
    }

    @Get('/cat/:category')
    async filterFundraiserByCategory(@Param('category') category:string):Promise<Fundraiser[]>{
        return await this.fundraiserService.filterFundraiserByCategory(category)
    }

    @Get('/search/:title')
    async searchForFundraiser(@Param('title') title:string):Promise<FundSearchSerializer[]>{
        return await this.fundraiserService.searchForFundraiser(title)
    }




}
