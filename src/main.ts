import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express'
import { join } from 'path';
import * as express from 'express'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'


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

  const config = new DocumentBuilder()
                    .setTitle("GoFundMe API")
                    .setDescription("This is the API definition of the Clone of GoFundMe")
                    .setVersion("1.0")
                    .setContact("Oliver Otchere","you.tube/c/OtchereDev","Oliverotchere4@gmail.com")
                    .build()

  const document = SwaggerModule.createDocument(app,config)

  SwaggerModule.setup("docs",app,document)

  await app.listen(3000);
}
bootstrap();
