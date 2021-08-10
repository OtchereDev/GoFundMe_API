import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {option} from './db/connectionOptions'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FundraiserModule } from './fundraiser/fundraiser.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...option,
      autoLoadEntities:true
    }), 
    UserModule, 
    AuthModule,
     FundraiserModule,
  ],

})
export class AppModule {}
