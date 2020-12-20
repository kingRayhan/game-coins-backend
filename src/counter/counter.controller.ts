import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CounterService } from './counter.service';

@ApiTags('Counter')
@Controller('counter')
export class CounterController {
  constructor(public counter: CounterService) {}

  @Get()
  public async getCounters() {
    const totalGames = await this.counter.totalGameCount();
    const pendingOrders = await this.counter.totalPendingOrder();
    const doneOrders = await this.counter.totalDoneOrder();
    return { totalGames, pendingOrders, doneOrders };
  }

  @Get(':resource')
  public resourceCounter(@Param('resource') resource: string) {
    return this.counter.resourceCounter(resource);
  }
}
