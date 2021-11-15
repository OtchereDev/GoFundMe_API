import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { FundraiserModule } from 'src/fundraiser/fundraiser.module';
import { CategoryResolver } from './resolvers/category.resolver';

@Module({
  providers: [CategoryService,CategoryResolver],
  controllers: [CategoryController],
  imports:[FundraiserModule]
})
export class CategoryModule {}
