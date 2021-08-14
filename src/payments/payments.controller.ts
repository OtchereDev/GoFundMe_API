import { Body, Controller, Post, UsePipes, ValidationPipe,Headers, Req, Param } from '@nestjs/common';
import { Charge } from './dto/charge.dto';
import { CommentDTO } from './dto/comment.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {

    constructor(private paymentService:PaymentsService){}

    @Post('/create-payment')
    @UsePipes(ValidationPipe)
    async handlePayment(@Body() body:Charge){
        return await this.paymentService.createPaymentIntent(
                                        body.amount,
                                        body.fundraiser_id,
                                        body.name
                                        )
        
    }


    @Post('/:intent_id/add-comment')
    @UsePipes(ValidationPipe)
    async addPayerComment(@Body() body:CommentDTO, 
                            @Param('intent_id') intent_id:string){

        return await this.paymentService.addPayerComment(intent_id,body.message)
    }

    @Post('/webhook')
    async handleWebhook(@Body() body,@Headers('stripe-signature') sign:string,@Req() req){
        
        await this.paymentService.handleWebhook(body,sign,req)
        return 
    }
}
