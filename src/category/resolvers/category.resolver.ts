
import {Resolver, ResolveField, Args, Query, ID, Parent} from '@nestjs/graphql'
import { Category } from 'src/fundraiser/entity/category.entity';
import { FundraiserObject } from 'src/fundraiser/models/fundraiser.model';
import { CategoryService } from '../category.service';
import { CategoryObject } from '../models/category.model';

@Resolver(CategoryObject)
export class CategoryResolver {
  constructor(
    private categoryService: CategoryService,
   
  ) {}

  @Query(()=>CategoryObject,{nullable:true})
  async category(@Args('id', {type:()=>ID}) id:string):Promise<Category>{
   return await this.categoryService.finOneById(id)
  }

  @Query(()=>[CategoryObject],{nullable:true})
  async categories():Promise<Category[]>{
    return await this.categoryService.getAllCategories()
  }

  @ResolveField("fundraisers",returns=>[FundraiserObject])
  async getFundraiser(@Parent() category: Category){
    return this.categoryService.getRelatedFundraisers(category.id)
  }
} 