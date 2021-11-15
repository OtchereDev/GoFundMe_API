import { BadRequestException, Injectable } from '@nestjs/common';
import { Category } from 'src/fundraiser/entity/category.entity';
import { FundraiserRepository } from 'src/fundraiser/entity/fundraiser.repo';
import { CategoryRepository } from './models/category.repo';

@Injectable()
export class CategoryService {
  constructor(private categoryRepo: CategoryRepository,
              private fundraiserRepo: FundraiserRepository){}

  async finOneById(id:string):Promise<Category>{
    try {
      
      return await this.categoryRepo.findOneOrFail({id})

    } catch (error) {

      throw new BadRequestException(error)

    }
  }

  async getAllCategories():Promise<Category[]>{
    return await this.categoryRepo.find()
  }

  async getRelatedFundraisers(categoryId:string){
    return await this.fundraiserRepo.filterCategory(categoryId)
  }
}
