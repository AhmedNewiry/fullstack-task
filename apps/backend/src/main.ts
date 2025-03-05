import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  app.use(cookieParser());

  const allowedOrigins = (
    configService.get<string>('ALLOWED_ORIGINS', 'http://localhost:4200')
      .split(',')
      .map(origin =>{
        origin = origin.trim();
        const url = new URL(origin);
        return `${url.protocol}//${url.host}`;
      })
  );

  logger.log(`those are the allowed origins: ${JSON.stringify(allowedOrigins)}`);
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        logger.warn(`Blocked CORS request from: ${origin}`);
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'X-CSRF-Token',
    ],
    exposedHeaders: ['Content-Length', 'X-Powered-By'],
    credentials: true,
    maxAge: 600,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

   const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription(
      'User Authentication API. After signing in, the access token is set as an HTTP‑only cookie named "access_token". This cookie is automatically sent with requests. To test protected endpoints, first use the /auth/signin endpoint to set the cookie.'
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  document.components = {
    ...document.components,
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'access_token',
      },
    },
  };


  SwaggerModule.setup('api-docs', app, document);

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);

  logger.log(`Application running on port ${port}`);
  logger.log(
    `Swagger documentation available at http://localhost:${port}/api-docs`
  );
}


bootstrap().catch(err => {
  new Logger('Startup').error('Failed to start application', err.stack);
  process.exit(1);
});
