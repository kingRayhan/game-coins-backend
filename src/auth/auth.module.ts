import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from './passport/jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [AuthService, JWTStrategy, PrismaModule],
  controllers: [AuthController],
  imports: [UserModule, JwtModule.register({ secret: 'hard!to-guess_secret' })],
})
export class AuthModule {}
