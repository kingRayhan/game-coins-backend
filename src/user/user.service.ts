import { ForbiddenException, Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(body: CreateUserDTO) {
    const user = await this.prisma.user.create({
      data: {
        ...body,
        password: hashSync(body.password),
      },
    });

    return user;
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findOne({ where: { email } });
  }
  async getUserById(userId) {
    return this.prisma.user.findOne({ where: { id: userId } });
  }
}
