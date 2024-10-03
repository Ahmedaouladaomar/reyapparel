import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // port
  const port = process.env.PORT;
  // client
  const client = `${process.env.CLIENT_URL}`;
  // cors
  app.enableCors({
    origin: [ client ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  });
  await app.listen(port || 4000);
}
bootstrap();
