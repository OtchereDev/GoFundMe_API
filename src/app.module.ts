import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {option} from './db/connectionOptions'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FundraiserModule } from './fundraiser/fundraiser.module';
import { PaymentsModule } from './payments/payments.module';
import { StoryModule } from './story/story.module';
import { GraphQLModule } from '@nestjs/graphql';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...option,
      autoLoadEntities:true
    }), 
    UserModule, 
    AuthModule,
    FundraiserModule,
    PaymentsModule,
    StoryModule,
    GraphQLModule.forRoot({
      // debug:true,
      playground:true,
      autoSchemaFile: true,
      introspection:true
    }),
    CategoryModule,
  ],

})
export class AppModule  {

}
