import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[UserModule,PassportModule,JwtModule.register({
    secret:config.jwtSecret,
    signOptions:{
      expiresIn:'1d'
    }
  })],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
