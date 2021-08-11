import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { Fundraiser } from './entity/fundraiser.entity';
import { FundraiserRepository } from './entity/fundraiser.repo';
import { FundraiserController } from './fundraiser.controller';
import { FundraiserService } from './fundraiser.service';

@Module({
  imports:[TypeOrmModule.forFeature([
    Fundraiser,Category,FundraiserRepository,   
  ]),
  ],
  controllers: [FundraiserController],
  providers: [FundraiserService,]
})
export class FundraiserModule {}
