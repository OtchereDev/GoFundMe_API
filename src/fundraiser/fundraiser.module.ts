import { Module } from '@nestjs/common';
import { FundraiserRepository } from './entity/fundraiser.repo';
import { FundraiserController } from './fundraiser.controller';
import { FundraiserService } from './fundraiser.service';

@Module({
  controllers: [FundraiserController],
  providers: [FundraiserService,FundraiserRepository]
})
export class FundraiserModule {}
