import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { CORS } from './constants';
async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'verbose'],
  });
  const configService = app.get(ConfigService);
  app.enableCors(CORS);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(configService.get('PORT'));
  logger.log(`Application is running on: ${configService.get('PORT')}`);
}
bootstrap();
