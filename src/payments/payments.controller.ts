import { Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {

    constructor(private paymentService:PaymentsService){}

    @Post()
    handlePayment(){

    }

    @Post()
    handleWebhook(){

    }
}
