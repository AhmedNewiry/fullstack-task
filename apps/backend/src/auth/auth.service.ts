import { PrismaService } from '@fullstack-task/prisma';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    try {
      const { name, email, password } = signupDto;
      const existingUser = await this.prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new BadRequestException('Email already in use');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
      return { message: 'User created successfully.' };
    } catch (error) {
      throw new InternalServerErrorException(`An error occurred while signing in ${error.message}`);
    }
  }
  
  async signin(signinDto: SigninDto) {
    try {
      const { email, password } = signinDto;
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Invalid credentials');
      }
  
      const payload = { sub: user.id, email: user.email };
      const token = this.jwtService.sign(payload);
      return { access_token: token };
    } catch (error) {
      throw new InternalServerErrorException(`An error occurred while signing in ${error.message}`);
    }
  }
}