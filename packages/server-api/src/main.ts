import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import * as session from 'express-session';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { SessionGuard } from './auth/guards/session.guard';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose'],
  });

  // enable helmet
  app.use(helmet());

  // some prisma relate stuff
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  const configService: ConfigService = app.get(ConfigService);

  console.log(configService.get<string>('NODE_ENV') === 'production');
  // configure session storage
  app.use(
    session({
      secret: configService.get<string>('SESSION_SIGN_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: configService.get<string>('NODE_ENV') === 'production',
        maxAge: 1 * 86400000, // (no of day) * milliseconds
      },
    }),
  );

  // configure versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // add global guards
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new SessionGuard(reflector));

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
