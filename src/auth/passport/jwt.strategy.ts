import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('token'),
        ExtractJwt.fromBodyField('token'),
      ]),
      secretOrKey: 'hard!to-guess_secret',
      ignoreExpiration: false,
    });
  }

  async validate(payload) {
    const user = await this.userService.getUserById(payload.userId);
    return { user };
  }
}
