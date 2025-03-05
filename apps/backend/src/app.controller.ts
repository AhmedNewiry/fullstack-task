import { Controller, Get} from '@nestjs/common';


@Controller('app')
export class AppController {

  @Get('welcome')
  getWelcome() {
    return { message: 'Welcome to the application.' };
  }
}