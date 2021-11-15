import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql/graphql.auth';
import DonationType from 'src/fundraiser/types/donations.type';
import { PaymentsService } from '../payments.service';

@Resolver(() => DonationType)
export class DonationResolver {
  constructor(private paymentService: PaymentsService) {}

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async addPayerComment(
    @Args('comment', { type: () => String }) comment: string,
    @Args('intent_id', { type: () => ID }) intent_id: string,
  ): Promise<Boolean> {
    return await this.paymentService.addPayerComment(intent_id, comment);
  }
}
