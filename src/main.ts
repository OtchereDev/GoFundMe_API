import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express'
import { join } from 'path';
import * as express from 'express'
import {DocumentBuilder, SwaggerCustomOptions, SwaggerModule} from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common';
import {graphqlUploadExpress} from "graphql-upload"


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
                    .setContact("Oliver Otchere","","Oliverotchere4@gmail.com")
                    .addBearerAuth()
                    .addOAuth2()
                    .build()


  const option:SwaggerCustomOptions={
    customSiteTitle:"GoFundMe Docs"
  } 

  const document = SwaggerModule.createDocument(app,config)

  SwaggerModule.setup("docs",app,document,option)

  app.useGlobalPipes(new ValidationPipe())

  app.use(graphqlUploadExpress())

  await app.listen(process.env.PORT ||3000);
}
bootstrap();
