import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() data: RegisterDTO) {
    return this.authService.register(data);
  }

  @Post('/login')
  login(@Body() data: LoginDTO) {
    return this.authService.login(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('/user')
  user(@Req() req) {
    return req.user;
  }
}
