import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './passport/jwt.strategy';

@Module({
  providers: [AuthService, JWTStrategy],
  controllers: [AuthController],
  imports: [UserModule, JwtModule.register({ secret: 'hard!to-guess_secret' })],
})
export class AuthModule {}
