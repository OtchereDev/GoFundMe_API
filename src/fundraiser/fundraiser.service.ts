import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { FundraiserDTO } from './dto/fundraiser.dto';
import { Fundraiser } from './entity/fundraiser.entity';
import { FundraiserRepository } from './entity/fundraiser.repo';
import CommentType from './types/comments.type';
import DonationType from './types/donations.type';
import { FundDetailSerializer } from './types/fundraiser-detail.serializer';
import { FundSearchSerializer } from './types/fundraiser-search.serializer';

@Injectable()
export class FundraiserService {

    constructor(private fundraiserRepo:FundraiserRepository){}

    async getAllFundraiser() {
        
        const fundraisers = await this.fundraiserRepo.find()
        return fundraisers.map(fundraiser=>{return {...fundraiser,amountRaised:fundraiser.amountRaised()}})
    }

    async getFundraiserDetail(id:string):Promise<FundDetailSerializer>{

        try {
            const query = await this.fundraiserRepo.findOneOrFail({id})
            const response:FundDetailSerializer={
                id: query.id,
                category: query.category.map(cat=>cat.name),
                title: query.title,
                description: query.description,
                beneficiary: query.beneficiary,
                donations: query.donations?.slice(-5),
                goal_amount: query.goal_amount,
                organiser: {
                    fullName:query.organiser.fullName,
                    email:query.organiser.email
                },
                country: query.country,
                createdAt: query.createdAt,
                amountRaised: query.amountRaised(),
                no_of_donors: query.no_of_donors(),
            }
            return response
        } catch (error) {
            throw new BadRequestException('No Fundraiser found with the id provided.')
        }
    }

    async getFundraiserDonations(id:string){
        try {
            const fundraiser = await this.fundraiserRepo.findOneOrFail({id})
            const response : DonationType = {
                donations: fundraiser.donations
            }

            return response
        } catch (error) {
            
        }
    }

    async getFundraiserComments(id:string){
        try {
            const fundraiser = await this.fundraiserRepo.findOneOrFail({id})

            
            const response : CommentType = {
                comments: fundraiser.donations.filter(donation=>donation.comment)
            }

            return response
        } catch (error) {
            
        }
    }

  
    async createFundraiser(body:FundraiserDTO,email:string):Promise<Fundraiser>{
        const user= await User.findOne({email})
        return this.fundraiserRepo.createFundraiser(body,user)
    }

 
    async addImageToFundraiser(image_path:string,id:string,email:string):Promise<void>{

        return await this.fundraiserRepo.addImageToFundraiser(image_path,id,email)

    }

  
    async filterFundraiserByLoc(loc:string):Promise<FundSearchSerializer[]>{
        const query = await this.fundraiserRepo.filterLoc(loc)

        
        return query
        
    }

   
    async filterFundraiserByCategory(category:string):Promise<Fundraiser[]>{
        return await this.fundraiserRepo.filterCategory(category)
    }


    async searchForFundraiser(title:string):Promise<FundSearchSerializer[]>{
        const query = await this.fundraiserRepo.searchByTitleLoc(title)
        
        return query

    }

}
