import { Controller, Post, Body, Logger } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    this.logger.log(`New signup attempt for ${signupDto.email}`);
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    this.logger.log(`Signin attempt for ${signinDto.email}`);
    return this.authService.signin(signinDto);
  }

  @Post('logout')
  async logout() {
    this.logger.log('User logged out');
    return { message: 'Logged out successfully.' };
  }
}