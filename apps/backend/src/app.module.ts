import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '@fullstack-task/prisma';
import { AppController } from './app.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60, 
          limit: 10,
        },
      ],
    }),
    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath:'.env'
    }),
    AuthModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
