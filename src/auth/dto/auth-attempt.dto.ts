import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthAttemptDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
