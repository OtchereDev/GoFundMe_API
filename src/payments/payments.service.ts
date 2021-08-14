import { BadRequestException, Injectable } from '@nestjs/common';
import { DonationRepository } from './entity/donation.repo';
import Stripe from 'stripe'
import config from 'src/config/config';
import { PaymentIntent } from './entity/payment-intent.entity';
import { Fundraiser } from 'src/fundraiser/entity/fundraiser.entity';


@Injectable()
export class PaymentsService {
    private stripe:Stripe
    constructor(private donationRepo:DonationRepository){
     this.stripe=new Stripe(config.stripeSecret,{apiVersion:'2020-08-27'})   
    }

    private readonly endpointSecret = config.stripeWebhook;
    
    verify_webhook(req,signature){
        
        
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

    async createPaymentIntent(amount:number, fundraiser_id,name){
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
                                        
                                }).save()
    
            return {
                clientSecret:paymentIntent.client_secret,
                intent_id:paymentIntent.id

            }
        } catch (error) {
           throw new BadRequestException('Fundraiser does not exist') 
        }
    }

   
   
    async handleWebhook(event:Stripe.Event,signature:string,req){
        this.verify_webhook(req,signature)
        
        switch (event.type) {
            case 'payment_intent.succeeded':

              const paymentIntent = event.data.object as Stripe.Charge;

              await this.donationRepo.saveDonation(
                  paymentIntent.id,
                  paymentIntent.metadata.name,
                  paymentIntent.amount,
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

    async addPayerComment(intent_id:string,message:string){
            await this.donationRepo.addPayerComment(intent_id,message)
        return 
    }

}
