import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

export interface RequestWithUser extends Request {
  user: { id: string; email: string }; // You can replace `any` with your specific user type if desired.
}
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly authService: AuthService
  ) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    this.logger.info(`New signup attempt for ${signupDto.email}`);
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  async signin(
    @Body() signinDto: SigninDto,
    @Res({ passthrough: true }) response: Response
  ) {
    this.logger.info(`Signin attempt for ${signinDto.email}`);
    const tokenData = await this.authService.signin(signinDto);
    response.cookie('access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 * 1000,
    });
    return { message: 'Signin successful' };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
    });
    this.logger.info('User logged out');
    return { message: 'Logged out successfully.' };
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('cookieAuth')
  @Get('me')
  getProfile(@Req() req: RequestWithUser) {
    return {
      message: 'User is logged in',
      user: req.user,
    };
  }
}
