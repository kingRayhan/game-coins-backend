import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
}

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  public password: string;

  @ApiProperty({ enum: ['ADMIN', 'MODERATOR'] })
  @IsNotEmpty()
  public role?: UserRole;
}
