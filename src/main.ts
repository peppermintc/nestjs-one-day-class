import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  // app.enableCors({ origin: configService.get<string>('FRONTEND_URL') });
  app.enableCors();

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  app.useGlobalPipes(new ValidationPipe({}));

  // swagger setup
  const SwaggerConfig = new DocumentBuilder()
    .setTitle('Elicelab Test')
    .setDescription('Elicelab Test API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(configService.get<number>('BACKEND_PORT'));
}
bootstrap();
