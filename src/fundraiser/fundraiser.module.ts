import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from 'src/category/models/category.repo';
import { UserModule } from 'src/user/user.module';
import { Category } from './entity/category.entity';
import { Fundraiser } from './entity/fundraiser.entity';
import { FundraiserRepository } from './entity/fundraiser.repo';
import { FundraiserController } from './fundraiser.controller';
import { FundraiserService } from './fundraiser.service';
import { FundraiserResolver } from './resolver/fundraiser.resolver';

@Module({
  imports:[TypeOrmModule.forFeature([
    Fundraiser,Category,FundraiserRepository,CategoryRepository  
  ]),UserModule ,
  ],
  controllers: [FundraiserController],
  providers: [FundraiserService,FundraiserResolver],
  exports:[
    TypeOrmModule
  ]
})
export class FundraiserModule {}
