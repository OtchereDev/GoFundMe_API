import { BadRequestException, Injectable } from '@nestjs/common';
import { DonationRepository } from './entity/donation.repo';
import Stripe from 'stripe'
import config from 'src/config/config';
import { PaymentIntent } from './entity/payment-intent.entity';
import { Fundraiser } from 'src/fundraiser/entity/fundraiser.entity';
import { PaymentInit } from './types/payment-init.type';


@Injectable()
export class PaymentsService {
    private stripe:Stripe
    constructor(private donationRepo:DonationRepository){
     this.stripe=new Stripe(config.stripeSecret,{apiVersion:'2020-08-27'})   
    }

    private readonly endpointSecret = config.stripeWebhook;
    
    verify_webhook(req,signature):void{
        
        
        try {
            const event = this.stripe.webhooks.constructEvent(
            req.rawBody,
            signature,
            this.endpointSecret
        );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            throw new BadRequestException();
        }

    }

    async createPaymentIntent(amount:number,tip:number, fundraiser_id:string,name:string) : Promise<PaymentInit>{
        try {
            await Fundraiser.findOneOrFail(fundraiser_id)
            const paymentIntent = await this.stripe.paymentIntents.create({
                
                currency: "usd",
                amount,
                metadata:{
                    name
                }
                
              });
    
            await PaymentIntent.create({intent_id:paymentIntent.id,
                                        amount:paymentIntent.amount,
                                        fundraiser_id,
                                        tip
                                }).save()
    
            return {
                clientSecret:paymentIntent.client_secret,
                intent_id:paymentIntent.id

            }
        } catch (error) {
           throw new BadRequestException('Fundraiser does not exist') 
        }
    }

   
   
    async handleWebhook(event:Stripe.Event,signature:string,req) : Promise<void>{
        this.verify_webhook(req,signature)
        
        switch (event.type) {
            case 'payment_intent.succeeded':

              const paymentIntent = event.data.object as Stripe.Charge;

              const intent = await PaymentIntent.findOneOrFail({intent_id: paymentIntent.id})

              const donationAmount = (paymentIntent.amount / 100) - intent.tip

              await this.donationRepo.saveDonation(
                  paymentIntent.id,
                  paymentIntent.metadata.name,
                  donationAmount,
              )
            
              break;
            case 'payment_method.attached':
              const paymentMethod = event.data.object;
              
              break;
            default:
              // Unexpected event type
              console.log(`Unhandled event type ${event.type}.`);
          } 
    }

    async addPayerComment(intent_id:string,message:string):Promise<Boolean>{
        await this.donationRepo.addPayerComment(intent_id,message)
        return true
    }

}
