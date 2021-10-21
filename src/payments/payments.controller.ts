import { Body, Controller, Post, UsePipes, ValidationPipe,Headers, Req, Param } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Charge } from './dto/charge.dto';
import { CommentDTO } from './dto/comment.dto';
import { PaymentsService } from './payments.service';
import { PaymentInit } from './types/payment-init.type';

@Controller('payments')
@ApiTags('Payments')
export class PaymentsController {

    constructor(private paymentService:PaymentsService){}

    @Post('/create-payment')
    @UsePipes(ValidationPipe)
    @ApiOkResponse({description:"Payment Initialized",type:PaymentInit})
    async handlePayment(@Body() body:Charge):Promise<PaymentInit>{
        return await this.paymentService.createPaymentIntent(
                                        body.amount,
                                        body.tip,
                                        body.fundraiser_id,
                                        body.name
                                        )
        
    }


    @Post('/:intent_id/add-comment')
    @UsePipes(ValidationPipe)
    @ApiParam({
        type:"string",
        name:"intent_id",
        description:"The intent id of the created payment"
    })
    @ApiOkResponse({description:"Added comment to Payment"})
    async addPayerComment(@Body() body:CommentDTO, 
                            @Param('intent_id') intent_id:string){

        return await this.paymentService.addPayerComment(intent_id,body.message)
    }


    @Post('/webhook')
    @ApiExcludeEndpoint()
    async handleWebhook(@Body() body,@Headers('stripe-signature') sign:string,@Req() req):Promise<void>{
        
        await this.paymentService.handleWebhook(body,sign,req)
        return 
    }
}
