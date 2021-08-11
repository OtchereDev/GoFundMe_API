import { User } from 'src/user/entity/user.entity'
import { Repository, EntityRepository } from 'typeorm'
import { FundraiserDTO } from '../dto/fundraiser.dto'
import { Category } from './category.entity'
import { Fundraiser } from './fundraiser.entity'


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

}