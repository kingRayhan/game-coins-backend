import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './passport/jwt.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AuthService, JWTStrategy],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({ secret: 'hard!to-guess_secret-ddd784774587' }),
  ],
})
export class AuthModule {}
