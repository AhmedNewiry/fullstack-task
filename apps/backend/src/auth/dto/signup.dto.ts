import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ example: 'John Doe', description: 'User name, at least 3 characters' })
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 characters.' })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Valid email address' })
  @IsEmail({}, { message: 'Invalid email address.' })
  email: string;

  @ApiProperty({ example: 'Password@123', description: 'Password with at least 8 characters, one letter, one number, and one special character' })
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
    message: 'Password must contain at least one letter, one number, and one special character.',
  })
  password: string;
}