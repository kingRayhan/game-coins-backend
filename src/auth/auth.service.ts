import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userSercice: UserService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDTO) {
    try {
      const user = await this.userSercice.createUser(data);
      return {
        message: 'Registered successfully',
        user,
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ForbiddenException('Email address already taken');
      }
    }
  }

  async login(data: LoginDTO) {
    const user = await this.userSercice.getUserByEmail(data.email);

    if (!user) throw new UnauthorizedException('Invalid credential');
    if (!user.verifyPassword(data.password))
      throw new UnauthorizedException('Invalid credential');

    const access_token = await this.jwtService.sign({
      userId: user.id,
    });

    return {
      access_token,
      user,
    };
  }
}
