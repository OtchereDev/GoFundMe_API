import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  ResolveField,
  Query,
  Mutation,
  Args,
  ID,
  Parent,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/graphql/graphql.auth';
import { CurrentUser } from 'src/auth/graphql/graphql.decorator';
import { Fundraiser } from '../entity/fundraiser.entity';
import { FundraiserRepository } from '../entity/fundraiser.repo';
import { FundraiserCreateInput } from '../inpus/fundraiser.input';
import {
  FundraiserObject,
  MinimalFundraiser,
} from '../models/fundraiser.model';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { UserRepository } from 'src/user/entity/user.repo';
import { CategoryRepository } from 'src/category/models/category.repo';

@Resolver((of) => FundraiserObject)
export class FundraiserResolver {
  constructor(
    private fundraiserRepo: FundraiserRepository,
    private userRepo: UserRepository,
  ) {}

  @Query(() => FundraiserObject, { nullable: true })
  async getFundraiser(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Fundraiser | null> {
    const fundraiser = await this.fundraiserRepo.findOne({ id });

    return fundraiser;
  }

  @Query(() => [FundraiserObject])
  async getAllFundraisers(): Promise<Fundraiser[]> {
    return await this.fundraiserRepo.find({ relations: ['category'] });
  }

  @Query(() => [MinimalFundraiser])
  async filterByLocation(
    @Args('location', { type: () => String }) location: string,
  ) {
    return await this.fundraiserRepo.filterLoc(location);
  }

  @Query(() => [MinimalFundraiser])
  async searchByTitle(@Args('title', { type: () => String }) title: string) {
    return await this.fundraiserRepo.searchByTitleLoc(title);
  }

  @Query(() => [MinimalFundraiser])
  async filterByCategory(@Args('category_id', { type: () => ID }) category_id: string) {
    return await this.fundraiserRepo.filterCategory(category_id);
  }

  @ResolveField('last_donation_time')
  async last_donation_time(
    @Parent() fundraiser: Fundraiser,
  ): Promise<Date | null> {
    return await fundraiser.last_donation_time();
  }

  @ResolveField('amountRaised')
  async amountRaised(@Parent() fundraiser: Fundraiser): Promise<number> {
    return await fundraiser.amountRaised();
  }

  @ResolveField('briefDescription')
  async briefDescription(@Parent() fundraiser: Fundraiser): Promise<string> {
    return fundraiser.getBrief();
  }

  @ResolveField('no_of_donors')
  async no_of_donors(@Parent() fundraiser: Fundraiser): Promise<number> {
    return fundraiser.no_of_donors();
  }

  @Mutation((returns) => FundraiserObject, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async createFundraiser(
    _parent: any,
    @Args({ type: () => FundraiserCreateInput })
    { input }: FundraiserCreateInput,
    @CurrentUser() user: any,
  ) {
    const userId = await this.userRepo.findOneOrFail({ email: user.email });
    return await this.fundraiserRepo.createFundraiser(input, userId);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async addFundraiserImage(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
    @Args({ name: 'fundraiser_id', type: () => ID }) id: string,
    @CurrentUser() user: any,
  ): Promise<boolean> {
    const extension = extname(filename);

    const fileName = `${uuidv4()}${extension}`;

    await new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${fileName}`))
        .on('finish', () => resolve(true))
        .on('error', () => {
          return reject(false);
        }),
    );

    await this.fundraiserRepo.addImageToFundraiser(`/media/${fileName}`, id, user?.email);

    return true;
  }
}
