import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller('app')
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('welcome')
  getWelcome() {
    return { message: 'Welcome to the application.' };
  }
}