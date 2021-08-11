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

    async addImageToFundraiser(image_path:string,id:string){

        try {
            const fundraiser=await this.findOneOrFail({id})

            fundraiser.image_url=image_path
            await fundraiser.save()

        } catch (error) {
            console.log(error)

            throw new BadRequestException('No Fundraiser found associated with the id provided.')
        }

    }

    async filterLoc(loc:string) : Promise<Fundraiser[]>{
        // const query = await this.createQueryBuilder()
        //                         .select('country')
        //                         .where("country LIKE '%:loc%'",{loc})
        //                         .getMany()

        const query= await this.find({where:{country:ILike(loc)}})
        console.log(query)
        return query
    }

}