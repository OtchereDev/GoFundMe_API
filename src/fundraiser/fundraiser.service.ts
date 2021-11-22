import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { FundraiserDTO } from './dto/fundraiser.dto';
import { Fundraiser } from './entity/fundraiser.entity';
import { FundraiserRepository } from './entity/fundraiser.repo';
import CommentType from './types/comments.type';
import DonationType from './types/donations.type';
import { FundDetailSerializer } from './types/fundraiser-detail.serializer';
import { FundSearchSerializer } from './types/fundraiser-search.serializer';
import { FundraiserHomeSerializer } from './types/fundraiser.home.serializer';

@Injectable()
export class FundraiserService {

    constructor(private fundraiserRepo:FundraiserRepository){}

    async getAllFundraiser():Promise<FundraiserHomeSerializer[]> {
        
        const query = await this.fundraiserRepo.getAllFundraiser() 

        const response:FundraiserHomeSerializer[]=[]
        for (const obj of query){

            response.push({...obj,
                last_donation_time:await obj.last_donation_time(),
                description:obj.getBrief(),
                amountRaised:await obj.amountRaised()
            })

        }
     
        
        return response
    }

    async getFundraiserDetail(id:string):Promise<FundDetailSerializer>{

        try {
            const query = await this.fundraiserRepo.findOneOrFail(id,{relations:["category"]})
            const response:FundDetailSerializer={
                id: query.id,
                category: query.category,
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
                amountRaised: await query.amountRaised(),
                no_of_donors: query.no_of_donors(),
                image_url: query.image_url
            }
            return response
        } catch (error) {
            console.log(error)
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

  
    async createFundraiser(body:FundraiserDTO,email:string):Promise<FundDetailSerializer>{
        const user= await User.findOne({email})
        const query=await this.fundraiserRepo.createFundraiser(body,user)
        const obj:FundDetailSerializer={
            id: query.id,
            category: query.category,
            title: query.title,
            description: query.description,
            beneficiary: query.beneficiary,
            donations: query.donations,
            goal_amount: query.goal_amount,
            organiser: query.organiser.fullName,
            country: query.country,
            createdAt: query.createdAt,
            amountRaised: await query.amountRaised(),
            no_of_donors: query.no_of_donors(),
            image_url:query.image_url
        }
        return obj
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
