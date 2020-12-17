import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDTO } from 'src/shared/PaginationDTO';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const data = await this.prisma.order.create({ data: createOrderDto });

    return {
      message: 'Order created successfully',
      data,
    };
  }

  async findAll({ limit = 10, page = 1 }: PaginationDTO) {
    const data = await this.prisma.order.findMany({
      take: +limit,
      skip: +limit * (+page - 1),
      orderBy: {
        createdAt: 'desc',
      },
    });

    const count = await this.prisma.game.count();

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

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
