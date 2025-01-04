import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // esse validationpipe é que vai detectar as validacoes do DTO, ou seja, cada req que chegar nas rotas que usarmos DTOs, ele vai validar se os campos estão corretos de acordo com as validaçoes que fizemos no DTO
  await app.listen(process.env.PORT ?? 3033);
}
bootstrap();