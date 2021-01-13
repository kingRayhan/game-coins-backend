import { ForbiddenException, Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDTO } from 'src/shared/PaginationDTO';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async registerAdmin(body: CreateUserDto) {
    const adminExists = await this.prisma.user.findFirst({
      where: { role: 'ADMIN' },
    });
    if (adminExists)
      throw new ForbiddenException('Admin registration has been turned off');

    const userExists = await this.getUserByEmail(body.email);
    if (userExists)
      throw new ForbiddenException(
        'Already have a account with this email address',
      );

    return this.prisma.user.create({
      data: { ...body, role: 'ADMIN', password: hashSync(body.password) },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
  async getUserById(userId) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  create(data: CreateUserDto) {
    return this.prisma.user.create({
      data: { ...data, password: hashSync(data.password) },
    });
  }

  async findAll({ limit = 10, page = 1 }: PaginationDTO) {
    const data = await this.prisma.user.findMany({
      take: +limit,
      skip: +limit * (+page - 1),
      orderBy: {
        createdAt: 'desc',
      },
    });

    const count = await this.prisma.user.count();

    return {
      data,
      meta: {
        totalItems: count,
        itemsPerPage: +limit,
        totalPages: Math.ceil(count / +limit),
        currentPage: +page,
      },
    };
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  //

  update(id: string, data: UpdateUserDto) {
    if (data.password) {
      data.password = hashSync(data.password);
    }

    return this.prisma.user.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
