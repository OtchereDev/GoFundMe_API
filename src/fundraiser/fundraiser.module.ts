import { Module } from '@nestjs/common';
import { FundraiserController } from './fundraiser.controller';
import { FundraiserService } from './fundraiser.service';

@Module({
  controllers: [FundraiserController],
  providers: [FundraiserService]
})
export class FundraiserModule {}
