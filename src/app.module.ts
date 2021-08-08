import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {option} from './db/connectionOptions'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({...option,
    autoLoadEntities:true}), UserModule, AuthModule,],
  controllers: [AppController, ],
  providers: [AppService],
})
export class AppModule {}
