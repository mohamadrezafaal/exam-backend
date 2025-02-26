import {
  BadRequestException,
  ValidationPipe
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger';
import * as fs from 'fs'

async function bootstrap() {
  initializeTransactionalContext()
  const keyFile=fs.readFileSync('./keys/ssl.key')
  const certificateFile=fs.readFileSync('./keys/ssl.crt')
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    httpsOptions:{
      key:keyFile,
      cert:certificateFile,
      rejectUnauthorized:true
    }
  });
   app.set('trust proxy',['loopback','linklocal','uniquelocal']);
  app.enableCors();
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);
  setupSwagger(app, configService);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      transformOptions: { enableImplicitConversion: true },
      validationError: {
        target: true,
        value: true,
      },
      //errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      //exceptionFactory: (errors) => new UnprocessableEntityException(errors),
      exceptionFactory: (errors) => {
        const result = errors.map((error, index) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
    }),
  );

  const port = configService.get('app.port');
  await app.listen(port);
  console.info('----------------------------------------------------');
  console.info(`| Server URL: https://localhost:${port}             |`);
  console.info(`| Swagger URL: https://localhost:${port}/doc        |`);
  console.info('----------------------------------------------------');
}
bootstrap();
