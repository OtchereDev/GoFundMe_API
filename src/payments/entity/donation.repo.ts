import { BadRequestException } from '@nestjs/common';
import { Fundraiser } from 'src/fundraiser/entity/fundraiser.entity';
import { EntityRepository, Repository } from 'typeorm'
import { Donation } from './donation.entity';
import { PaymentIntent } from './payment-intent.entity';


@EntityRepository(Donation)
export class DonationRepository extends Repository<Donation>{

    async saveDonation(intent_id:string,name,amount){
        try {
            
            const intent=await PaymentIntent.findOneOrFail({intent_id})
            const fundraiser=await Fundraiser.findOneOrFail(intent.fundraiser_id)

            await  this.create({
                name,fundraiser,amount,intent
            }).save()

        } catch (error) {
            console.log(error)
            throw new BadRequestException()
        }
    }


    async addPayerComment(intent_id:string,message:string){
        try {
            
            const donation=await this.findOneOrFail({where:{intent:{intent_id}},relations:['intent']})
    
            donation.comment=message
            await donation.save()
        } catch (error) {
            console.log(error)
            throw new BadRequestException('Invalid intent_id')
        }
    }
}