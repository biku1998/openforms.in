import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // some prisma relate stuff
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  const configService: ConfigService = app.get(ConfigService);

  // configure session storage
  app.use(
    session({
      secret: configService.get<string>('SESSION_SIGN_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );

  // configure versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
