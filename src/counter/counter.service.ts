import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CounterService {
  constructor(private prisma: PrismaService) {}

  public async totalGameCount() {
    return await this.prisma.game.count();
  }

  public async totalPendingOrder() {
    return await this.prisma.order.count({
      where: { status: 'PENDING' },
    });
  }

  public async totalDoneOrder() {
    return await this.prisma.order.count({
      where: { status: 'DONE' },
    });
  }

  public async resourceCounter(resource: string) {
    const re = this.prisma[resource];
    console.log(re);
    return resource;
  }
}
