import { Repository, EntityRepository } from 'typeorm'
import { Fundraiser } from './fundraiser.entity'


@EntityRepository(Fundraiser)
export class FundraiserRepository extends Repository<Fundraiser>{

}