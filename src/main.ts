import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
const PORT = process.env.SERVER_PORT || 5000;
const ORIGIN = process.env.ORIGIN;
const secret = process.env.PRIVATE_KEY_REFRESH;
async function start() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: ORIGIN,
    credentials: true
  })
  await app.listen(PORT, () => { console.log(`Server started on PORT=${PORT}`) });
}
start();
