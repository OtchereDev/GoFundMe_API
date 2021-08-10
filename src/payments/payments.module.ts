import { Module } from '@nestjs/common';
import { DonationRepository } from './entity/donation.repo';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, DonationRepository]
})
export class PaymentsModule {}
