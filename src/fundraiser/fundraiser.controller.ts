import { Body, Controller, Get, Post, ValidationPipe, UsePipes, UseInterceptors, UploadedFile, Param, ParseUUIDPipe, UseGuards, Req, } from '@nestjs/common';
import { FundraiserDTO } from './dto/fundraiser.dto';
import { Fundraiser } from './entity/fundraiser.entity';
import { FundraiserService } from './fundraiser.service';
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { imageStorage } from 'src/config/multer.storages';
import { ParamInterceptor } from './params.interceptor';
import { FundSearchSerializer } from './types/fundraiser-search.serializer';
import { FundDetailSerializer } from './types/fundraiser-detail.serializer';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from './types/fundraiser-file-upload.dto';
import DonationType from './types/donations.type';
import CommentType from './types/comments.type';



@Controller('fundraiser')
@ApiTags('Fundraiser')
export class FundraiserController {

    constructor(private fundraiserService:FundraiserService){}

    @Get()
    async getAllFundraiser(){
        return await this.fundraiserService.getAllFundraiser()
    }

    @Get('/detail/:uuid')
    async getDetailFundraiser(@Param('uuid',ParseUUIDPipe) id:string):Promise<FundDetailSerializer>{
        return await this.fundraiserService.getFundraiserDetail(id)

    }

    @Post('/detail/donations/:uuid')
    async getFundraiserDonations(@Param("uuid",ParseUUIDPipe) id:string):Promise<DonationType>{
        return await this.fundraiserService.getFundraiserDonations(id)
    }

    @Post('/detail/comments/:uuid')
    async getFundraiserComments(@Param("uuid",ParseUUIDPipe) id:string):Promise<CommentType>{
        return await this.fundraiserService.getFundraiserComments(id)
    }

    @Post('/create')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async createFundraiser(@Body() body:FundraiserDTO,@Req() req):Promise<Fundraiser>{
        return await this.fundraiserService.createFundraiser(body,req.user.email)
    }

    @Post('/upload/image/:id')
    @UseGuards(JwtGuard)
    @UseInterceptors(ParamInterceptor,FileInterceptor('image',{storage:imageStorage}))
    @ApiConsumes('multipart/form-data')
    @ApiParam({
        type:"string",
        description:"valid uuid for fundraiser",
        name:'id'
    })
    @ApiBody({
        type:FileUploadDto,
        description: "Image for fundraiser"
    })
    @ApiBearerAuth()
    async addImageToFundraiser(@UploadedFile() image:Express.Multer.File, 
                                @Param('id') id:string,
                                @Req() req):Promise<void>{
        const path ='/media/images/'+image.filename
        return await  this.fundraiserService.addImageToFundraiser(path,id,req.user.email)
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
