import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userSercice: UserService,
    private jwtService: JwtService,
  ) {}

  registerUser(body) {
    return this.userSercice.createUser(body);
  }

  login() {}
}
