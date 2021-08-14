import {  Module,} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from './entity/donation.entity';
import { DonationRepository } from './entity/donation.repo';
import { PaymentIntent } from './entity/payment-intent.entity';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';


@Module({
  imports:[TypeOrmModule.forFeature([
    Donation,DonationRepository,PaymentIntent
  ])],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule {
 
}
