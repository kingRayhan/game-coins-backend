import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('token'),
        ExtractJwt.fromBodyField('token'),
      ]),
      secretOrKey: 'hard!to-guess_secret-ddd784774587',
      ignoreExpiration: false,
    });
  }

  async validate(payload) {
    const user = await this.userService.getUserById(payload.userId);
    // aita amon e rakhte hobe for nuxt/auth
    return { user };
  }
}
