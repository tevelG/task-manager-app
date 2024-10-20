import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',  // Allow the frontend URL
    methods: 'GET,POST,PUT,DELETE',  // Specify the allowed HTTP methods
    credentials: true,  // If you are sending cookies or authentication tokens
  });

  app.useGlobalPipes(new ValidationPipe({}));

  await app.listen(3000);
}
bootstrap();
