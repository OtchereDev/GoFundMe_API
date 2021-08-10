import { Injectable } from '@nestjs/common';
import { DonationRepository } from './entity/donation.repo';

@Injectable()
export class PaymentsService {

    constructor(private donationRepo:DonationRepository){}

    handlePayment(){

    }

   
    handleWebhook(){
        
    }

}
