import { BadRequestException } from '@nestjs/common'
import { User } from 'src/user/entity/user.entity'
import { Repository, EntityRepository } from 'typeorm'
import { FundraiserDTO } from '../dto/fundraiser.dto'
import { Category } from './category.entity'
import { Fundraiser } from './fundraiser.entity'
import { ILike } from 'typeorm'


@EntityRepository(Fundraiser)
export class FundraiserRepository extends Repository<Fundraiser>{

    async createFundraiser(body:FundraiserDTO,organiser:User):Promise<Fundraiser>{

        let category=await Category.findOne({name:body.category})

        if (!category){
            category=await Category.create({name:body.category}).save()
        }
        const fundraiserData={...body,organiser,category:[category],image_url:"/google/"}

        return this.create({...fundraiserData}).save()


    }

    async addImageToFundraiser(image_path:string,id:string,email:string){

        try {
            const fundraiser=await this.findOneOrFail({where:{id,organiser:{email}},relations:["organiser"]})

            fundraiser.image_url=image_path
            await fundraiser.save()

        } catch (error) {
            console.log(error)

            throw new BadRequestException('No Fundraiser found associated with the id provided.')
        }

    }

    async filterLoc(loc:string) : Promise<Fundraiser[]>{
        const query = await this.createQueryBuilder("fund")
                                .leftJoinAndSelect('fund.organiser','organiser', )
                                .select(["fund.id", "fund.country","fund.title", "fund.image_url", "organiser.fullName"])
                                .where("country LIKE :loc",{loc : `%${loc}%`})
                                .orderBy("fund.createdAt","DESC")
                                .getMany()
                            
        return query
    }

    async filterCategory(categ:string) : Promise<Fundraiser[]>{

        const query= await this.find({where:{category:{name:ILike(categ)}}})
        
        return query
    }

    async searchByTitleLoc(title:string) : Promise<Fundraiser[]>{

        const query= await this.createQueryBuilder("fund")
                                .leftJoinAndSelect('fund.organiser','organiser', )
                                .select(["fund.id", "fund.country","fund.title", "fund.image_url", "organiser.fullName"])
                                .where("fund.title LIKE :title",{title : `%${title}%`})
                                .orWhere("fund.country LIKE :title", {title:`%${title}%`})
                                .orderBy("fund.createdAt","DESC")
                                .getMany()
        
        return query
    }

}