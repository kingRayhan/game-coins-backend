import { Injectable } from '@nestjs/common';
import { MailerService } from 'src/mailer/mailer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDTO } from 'src/shared/PaginationDTO';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService, private mailer: MailerService) {}

  async create(createOrderDto: CreateOrderDto) {
    const data = await this.prisma.order.create({ data: createOrderDto });

    return {
      message: 'Order created successfully',
      data,
    };
  }

  async findAll({ limit = 10, page = 1 }: PaginationDTO, status: any) {
    const data = await this.prisma.order.findMany({
      take: +limit,
      skip: +limit * (+page - 1),
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        status,
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

  findOne(id: string) {
    return this.prisma.order.findUnique({ where: { id } });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({ where: { id }, data: updateOrderDto });
  }

  async remove(id: string) {
    try {
      await this.prisma.order.delete({ where: { id } });
      return {
        message: 'deleted succesfully',
      };
    } catch (error) {
      console.log(JSON.stringify(error, undefined, 4));
    }
  }

  async sendPass(orderId: string, token: string) {
    const { customerEmail: to, game } = await this.findOne(orderId);

    console.log(token);

    const html = `
      <h3>Thanks for purchasing from ${process.env.APP_NAME}</h2>
      <p>Your pass code is <b>${token}</b></p>  
    `;
    await this.mailer.sendMail({ to, html, subject: `${game} pass code` });
  }
}
