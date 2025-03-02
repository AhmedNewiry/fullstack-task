import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty({ example: 'john.doe@example.com', description: 'Valid email address' })
  @IsEmail({}, { message: 'Invalid email address.' })
  email: string;

  @ApiProperty({ example: 'Password@123', description: 'User password' })
  @IsNotEmpty()
  password: string;
}