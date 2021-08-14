import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express'
import { join } from 'path';
import * as express from 'express'


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    bodyParser:false
  });
  app.useStaticAssets(join(__dirname,'..','uploads'),{
    prefix:'/media'
  })
  app.enableCors({
    origin:'*'
  })
  app.use( express.json({verify:(req:any,res,buf)=>{req.rawBody=buf}}));
  await app.listen(3000);
}
bootstrap();
