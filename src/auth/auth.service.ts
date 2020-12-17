import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthAttemptDTO } from './dto/auth-attempt.dto';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userSercice: UserService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDTO) {
    const userExists = await this.userSercice.getUserByEmail(data.email);
    if (userExists)
      throw new ForbiddenException(
        'Already have a account with this email address',
      );

    const user = await this.userSercice.createUser(data);

    return {
      message: 'Registered successfully',
      user,
    };
  }

  async login(data: LoginDTO) {
    const authenticated = await this.attempt(data);
    if (!authenticated) throw new UnauthorizedException('Invalid credential');

    const user = await this.userSercice.getUserByEmail(data.email);
    const access_token = await this.jwtService.sign({
      userId: user.id,
    });

    return {
      access_token,
      user,
    };
  }

  /**
   * Attemp to login
   * @param data AuthAttemptDTO
   */
  async attempt(data: AuthAttemptDTO) {
    const user = await this.userSercice.getUserByEmail(data.email);
    if (!user) return false;

    return compareSync(data.password, user.password);
  }
}
