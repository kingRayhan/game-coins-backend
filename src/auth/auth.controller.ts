import { Body, Controller, Post } from '@nestjs/common';
import { RegisteruserDTO } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() body: RegisteruserDTO) {
    return this.authService.registerUser(body);
  }
}
