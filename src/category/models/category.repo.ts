import { BadRequestException } from '@nestjs/common'
import { Category } from 'src/fundraiser/entity/category.entity'
import { Repository, EntityRepository } from 'typeorm'

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category>{
  async getRelatedFundraiser(categoryId:string){
    console.log(categoryId)
    const result =await this.createQueryBuilder("category")
    .leftJoinAndSelect("category.fundraisers","fundraiser")
    // .select([])
    .where("fundraiser.category.id = :categoryId",{categoryId})
    .getMany()
    console.log(result)
    return result
  }
}